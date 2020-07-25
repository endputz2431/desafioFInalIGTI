// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
import { db } from '../models/index.js';

const transaction = db.transaction;

const create = async (req, res) => {
  const dateFR = req.body.yearMonthDay;
  const arrData = String(dateFR).split('-');
  const dateF = new Date(arrData[0], arrData[1] - 1, arrData[2]);

  const TransactionBD = new transaction({
    description: req.body.description, // inserção direta
    value: req.body.value, // inserção direta
    category: req.body.category, // inserção direta
    year: arrData[0],
    month: arrData[1],
    day: arrData[2],
    yearMonth: `${arrData[0]}-${arrData[1]}`,
    yearMonthDay: `${arrData[0]}-${arrData[1]}-${arrData[2]}`,
    type: req.body.type, // inserção direta
  });
  //console.log(arrData[0]);
  try {
    await TransactionBD.save(TransactionBD);
    res.send({ message: 'Transaction inserido com sucesso' });
    //logger.info(`POST /transaction - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    //logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const period = req.params.period;
  try {
    const data = await transaction.find({ yearMonth: period }).sort({ day: 1 });
    if (data.length < 1) {
      res.status(404).send({ message: 'Nenhum transaction encontrado' });
    } else {
      res.send({ length: data.length, transactions: data });
      //logger.info(`GET /grade`);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    //logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const searchOne = req.params.search;
  const period = req.params.period;

  try {
    const data = await transaction.find({
      description: { $regex: new RegExp(searchOne), $options: 'i' },
      yearMonth: period,
    });

    if (data.length < 1) {
      res.status(404).send({ message: 'Transaction não encontrado' });
    } else {
      res.send({ length: data.length, transactions: data });
      //logger.info(`GET /grade - ${id}`);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Erro ao buscar o Transaction: ' + searchOne });
    //logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualização vazio',
    });
  }

  const id = req.params.id;

  const dateFR = req.body.yearMonthDay;
  const arrData = String(dateFR).split('-');
  const dateF = new Date(arrData[0], arrData[1] - 1, arrData[2]);

  const TransactionBD = {
    description: req.body.description, // inserção direta
    value: req.body.value, // inserção direta
    category: req.body.category, // inserção direta
    year: arrData[0],
    month: arrData[1],
    day: arrData[2],
    yearMonth: `${arrData[0]}-${arrData[1]}`,
    yearMonthDay: `${arrData[0]}-${arrData[1]}-${arrData[2]}`,
    type: req.body.type, // inserção direta
  };

  try {
    const data = await transaction.findByIdAndUpdate(
      { _id: id },
      TransactionBD,
      {
        new: true,
      }
    );

    if (!data.length < 1) {
      res.status(404).send({ message: 'Transaction não encontrado' });
    } else {
      res.send({ message: 'Transaction atualizado com sucesso' });
      //logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Erro ao atualizar a Transaction id: ' + id });
    //logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await transaction.findByIdAndDelete({ _id: id });

    if (!data.length < 1) {
      res.status(404).send({ message: 'Transaction não encontrado' });
    } else {
      res.send({ message: 'Transaction excluído com sucesso' });
      //logger.info(`DELETE /grade - ${id}`);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possível excluir o Transaction id: ' + id });
    //logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await transaction.deleteMany();

    if (!data.length < 1) {
      res.status(404).send({ message: 'Transaction não encontrados' });
    } else {
      res.send({
        message: `Transaction excluídos`,
      });
      //logger.info(`DELETE /grade`);
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Transactions' });
    //logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };

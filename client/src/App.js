import React from 'react';
import M from 'materialize-css';
import { PERIODS } from './helpers/periods';

export default function App() {
  const [transactions, setTransactions] = React.useState([]);
  const [quantReceitas, setQuantReceitas] = React.useState(0);
  const [quantDespesas, setQuantDespesas] = React.useState(0);
  const [saldo, setSaldo] = React.useState(0);
  const [quantLancamentos, setQuantLancamentos] = React.useState([]);
  const [currentPeriods, setCurrentPeriods] = React.useState(PERIODS[18]);

  // variáveis de inserção
  const [description, setDescription] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [value, setValue] = React.useState('');
  const [yearMonthDay, setYearMonthDay] = React.useState('');
  const [type, setType] = React.useState('');

  // variáveis de atualização
  const [updateVarDescription, setUpdateVarDescription] = React.useState('');
  const [updateCategory, setUpdateCategory] = React.useState('');
  const [updateValue, setUpdateValue] = React.useState('');
  const [updateYearMonthDay, setUpdateYearMonthDay] = React.useState('');
  const [updateType, setUpdateType] = React.useState('');

  const [isInserting, setIsInserting] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);

  const [deleted, setDeleted] = React.useState('');
  const [updated, setUpdated] = React.useState('');

  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    // BUSCAR UM

    if (search !== '') {
      const searchTransactions = async () => {
        //link da API da rota findAll por período
        const url = `http://localhost:3001/api/transaction/find/${search}/${currentPeriods}`;
        const resource = await fetch(url);
        const json = await resource.json();

        setTransactions(json.transactions);

        if (!json.message) {
          setQuantLancamentos(json);

          const resQuantReceitas = json.transactions
            .filter((cond) => cond.type === '+')
            .reduce((acumulador, valorAtual) => {
              return acumulador + valorAtual.value;
            }, 0);

          setQuantReceitas(resQuantReceitas);

          const resQuantDespesas = json.transactions
            .filter((cond) => cond.type === '-')
            .reduce((acumulador, valorAtual) => {
              return acumulador + valorAtual.value;
            }, 0);

          setQuantDespesas(resQuantDespesas);

          setSaldo(resQuantReceitas - resQuantDespesas);
        } else {
          setQuantLancamentos(0);
          setQuantDespesas(0);
          setQuantReceitas(0);
          setSaldo(0);
        }
      };

      searchTransactions();
    }

    // ATUALIZAÇÃO

    if (isUpdating === true) {
      const updateDescription = async () => {
        const url = `http://localhost:3001/api/transaction/${updated}`;

        fetch(url, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            description: updateVarDescription,
            value: updateValue,
            category: updateCategory,
            yearMonthDay: updateYearMonthDay,
            type: updateType,
          }),
        });

        setIsUpdating(false);
      };

      updateDescription();
    }

    // INSERÇÃO

    if (isInserting === true) {
      const insertDescription = async () => {
        const url = 'http://localhost:3001/api/transaction';

        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            description: description,
            value: value,
            category: category,
            yearMonthDay: yearMonthDay,
            type: type,
          }),
        });

        setIsInserting(false);
      };

      insertDescription();
    }

    // BUSCA
    if (search === '') {
      const fetchTransactions = async () => {
        //link da API da rota findAll por período
        const url = `http://localhost:3001/api/transaction/${currentPeriods}`;
        const resource = await fetch(url);
        const json = await resource.json();

        setTransactions(json.transactions);
        setQuantLancamentos(json);

        const resQuantReceitas = json.transactions
          .filter((cond) => cond.type === '+')
          .reduce((acumulador, valorAtual) => {
            return acumulador + valorAtual.value;
          }, 0);

        setQuantReceitas(resQuantReceitas);

        const resQuantDespesas = json.transactions
          .filter((cond) => cond.type === '-')
          .reduce((acumulador, valorAtual) => {
            return acumulador + valorAtual.value;
          }, 0);

        setQuantDespesas(resQuantDespesas);

        setSaldo(resQuantReceitas - resQuantDespesas);
      };

      fetchTransactions();
    }

    // EXCLUSÃO

    if (deleted !== '') {
      const excluirTransaction = async () => {
        const requestOptions = {
          method: 'DELETE',
        };

        fetch(
          `http://localhost:3001/api/transaction/${deleted}`,
          requestOptions
        ).then((response) => {
          return response.json();
        });

        //console.log(deleted);
        setDeleted('');
      };

      excluirTransaction();
    }
  }, [currentPeriods, deleted, isInserting, updated, isUpdating, search]);

  React.useEffect(() => {
    M.AutoInit();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handlePeriodChange = (event) => {
    setCurrentPeriods(event.target.value);
  };

  const handleDeleteClick = (id) => {
    setDeleted(id);
  };

  const handleUpdateClick = (transaction) => {
    setUpdated(transaction._id);
    setUpdateVarDescription(transaction.description);
    setUpdateCategory(transaction.category);
    setUpdateValue(transaction.value);
    setUpdateYearMonthDay(transaction.yearMonthDay);
    setUpdateType(transaction.type);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleYearMonthDayChange = (event) => {
    setYearMonthDay(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  // Handle UPDATES

  const handleUpdateDescriptionChange = (event) => {
    setUpdateVarDescription(event.target.value);
  };

  const handleUpdateCategoryChange = (event) => {
    setUpdateCategory(event.target.value);
  };

  const handleUpdateValueChange = (event) => {
    setUpdateValue(event.target.value);
  };

  const handleUpdateYearMonthDayChange = (event) => {
    setUpdateYearMonthDay(event.target.value);
  };

  const handleUpdateTypeChange = (event) => {
    setUpdateType(event.target.value);
  };

  const HandleInsertDescription = () => {
    setIsInserting(true);
  };

  const HandleUpdateDescription = () => {
    setIsUpdating(true);
  };

  // STYLE
  const infoBoxR = {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    border: '1px solid transparent',
    borderRadius: '4px',
    padding: '5px',
    margin: '20px 5px 5px', // fazer condição para se datas diferentes mudar espaçamento
    backgroundColor: 'rgb(161, 240, 220)',
  };

  const infoBoxD = {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    border: '1px solid transparent',
    borderRadius: '4px',
    padding: '5px',
    margin: '20px 5px 5px', // fazer condição para se datas diferentes mudar espaçamento
    backgroundColor: 'rgb(240, 161, 168)',
  };

  const infoBox = (type) => {
    if (type === '+') {
      return infoBoxR;
    } else {
      return infoBoxD;
    }
  };

  const infoDay = {
    marginRight: '20px',
    fontFamily: 'Consolas, monospace',
    fontWeight: 'bold',
    fontSize: '1.5rem',
  };

  const infoCategoryDescriptionValue = {
    display: 'flex',
    flex: '7 1 0%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const infoCategoryDescription = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  };

  const infoCategory = {
    fontWeight: 'bold',
    fontSize: '1.2rem',
  };

  const infoDescription = {
    fontSize: '1.1rem',
  };

  const infoValue = {
    textAlign: 'right',
    fontFamily: 'Consolas, monospace',
    fontSize: '1.8rem',
  };

  const infoBtn = {
    fontSize: '1.2rem',
    cursor: 'pointer',
    marginRight: '10px',
  };

  const infoBoxBtn = {
    marginLeft: '10px',
    display: 'flex',
    flex: '1 1 0%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  };

  return (
    <div className="container">
      <h1 className="center">Desafio Final do Bootcamp Full Stack</h1>
      <h2 className="center">Controle Financeiro Pessoal</h2>
      <h2 className="center">{isInserting}</h2>
      <h2 className="center">{isUpdating}</h2>
      <label style={{ display: 'none' }}>
        {deleted}
        {type}
      </label>

      <select value={currentPeriods} onChange={handlePeriodChange}>
        {PERIODS.map((period) => {
          return (
            <option key={period} value={period}>
              {period}
            </option>
          );
        })}
      </select>

      <div className="row">
        <a
          className="waves-effect waves-light btn modal-trigger col"
          href="#modal1"
        >
          + NOVO LANÇAMENTO
        </a>

        <input
          className="col s9"
          style={{ marginLeft: '25px' }}
          type="text"
          placeholder="Filtro"
          value={search}
          onChange={handleSearchChange}
        ></input>
      </div>

      <div id="modal1" className="modal">
        <div className="modal-content">
          <h4>Inclusão de lançamento</h4>
          <div className="container">
            <div className="center" onChange={handleTypeChange.bind(this)}>
              <label style={{ marginRight: '80px' }}>
                <input name="desRes" type="radio" value="-" />
                <span>Despesa</span>
              </label>
              <label>
                <input name="desRes" type="radio" value="+" />
                <span>Receita</span>
              </label>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  id="descricao"
                  type="text"
                  className="validate"
                  value={description}
                  onChange={handleDescriptionChange}
                />
                <label htmlFor="text">Descrição</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  id="categoria"
                  type="text"
                  className="validate"
                  value={category}
                  onChange={handleCategoryChange}
                />
                <label htmlFor="text">Categoria</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s6">
                <input
                  id="valor"
                  type="number"
                  className="validate"
                  value={value}
                  onChange={handleValueChange}
                />
                <label htmlFor="number">Valor</label>
              </div>

              <div className="input-field col s6">
                <input
                  id="date"
                  type="date"
                  className="validate"
                  value={yearMonthDay}
                  onChange={handleYearMonthDayChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn"
            onClick={() => HandleInsertDescription()}
          >
            Salvar
          </a>
        </div>
      </div>

      <div className="row">
        <div className="col s3">
          <strong>Lançamentos: </strong>
          {quantLancamentos.length}
        </div>
        <div className="col s3">
          <strong>Receitas: </strong>
          {quantReceitas}
        </div>
        <div className="col s3">
          <strong>Despesas: </strong>
          {quantDespesas}
        </div>
        <div className="col s3">
          <strong>Saldo: </strong>
          {saldo}
        </div>
      </div>

      <div id="modal2" className="modal">
        <div className="modal-content">
          <h4>Atualização de lançamento</h4>
          <div className="container">
            <div
              className="center"
              onChange={handleUpdateTypeChange.bind(this)}
            >
              <label style={{ marginRight: '80px' }}>
                <input name="desRes" type="radio" value="-" />
                <span>Despesa</span>
              </label>
              <label>
                <input name="desRes" type="radio" value="+" />
                <span>Receita</span>
              </label>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  id="descricao2"
                  type="text"
                  className="validate"
                  value={updateVarDescription}
                  onChange={handleUpdateDescriptionChange}
                />
                <label htmlFor="text">Descrição</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  id="categoria2"
                  type="text"
                  className="validate"
                  value={updateCategory}
                  onChange={handleUpdateCategoryChange}
                />
                <label htmlFor="text">Categoria</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s6">
                <input
                  id="valor"
                  type="number"
                  className="validate"
                  value={updateValue}
                  onChange={handleUpdateValueChange}
                />
                <label htmlFor="number">Valor</label>
              </div>

              <div className="input-field col s6">
                <input
                  id="date"
                  type="date"
                  className="validate"
                  value={updateYearMonthDay}
                  onChange={handleUpdateYearMonthDayChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn"
            onClick={() => HandleUpdateDescription()}
          >
            Editar
          </a>
        </div>
      </div>

      <div>
        {transactions &&
          transactions.map((transaction) => {
            return (
              <div style={infoBox(transaction.type)} key={transaction._id}>
                <span style={infoDay}>{transaction.day}</span>
                <div style={infoCategoryDescriptionValue}>
                  <div style={infoCategoryDescription}>
                    <span style={infoCategory}>{transaction.category}</span>
                    <span style={infoDescription}>
                      {transaction.description}
                    </span>
                  </div>
                  <span style={infoValue}>{transaction.value}</span>
                </div>
                <div style={infoBoxBtn}>
                  <span
                    className="material-icons modal-trigger"
                    href="#modal2"
                    onClick={() => {
                      handleUpdateClick(transaction);
                    }}
                    style={infoBtn}
                  >
                    edit
                  </span>
                  <span
                    className="material-icons"
                    onClick={() => {
                      handleDeleteClick(transaction._id);
                    }}
                    style={infoBtn}
                  >
                    delete
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

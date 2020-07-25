import express from 'express';
import controller from '../controllers/transactionController.js';

const app = express();

app.post('/', controller.create); // funciona
app.get('/:period', controller.findAll); // funciona
app.get('/find/:search/:period', controller.findOne); // funciona
app.put('/:id', controller.update); // funciona
app.delete('/:id', controller.remove); // funciona
app.delete('/', controller.removeAll);

export { app as routes };

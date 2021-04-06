import express from 'express';
//const express = require('express')


import './database/database' 
import TarefaController from './controllers/TarefaController'
 
const app = express();
const porta = 3333;

app.use(express.json());
app.get('/tarefas', TarefaController.index);
app.post('/tarefas', TarefaController.create);
app.delete('/tarefas/:id', TarefaController.delete);
app.put('/tarefas/:nome', TarefaController.update);

app.listen(porta, () => {
    console.log("logado na portass" + porta)  

});   

export default app;
 


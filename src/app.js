const express = require('express');
const cors = require('cors');
require('dotenv').config();

const bookRoutes = require('./routes/books');

const app = express();

// Configuração de middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas da aplicação
app.use('/bookapi/v1/book', bookRoutes);

// Endpoint raiz
app.get('/', (req, res) => {
  res.json({
    message: 'BookAPI V1 - API REST para Livros',
    version: '1.0.0',
    baseUrl: '/bookapi/v1'
  });
});

// Tratativa para rotas inexistentes
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint não encontrado' });
});

// Tratativa genérica de erros
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

module.exports = app;

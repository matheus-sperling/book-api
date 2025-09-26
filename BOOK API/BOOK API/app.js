const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const bookRoutes = require('./routes/books');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/bookapi/v1/book', bookRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'BookAPI V1 - API REST para Livros',
    version: '1.0.0',
    baseUrl: '/bookapi/v1'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint não encontrado' });
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

module.exports = app;
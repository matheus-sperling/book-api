const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  autor: {
    type: String,
    required: true,
    trim: true
  },
  editora: {
    type: String,
    required: true,
    trim: true
  },
  anoPublicacao: {
    type: Number,
    required: true,
    min: 1000,
    max: new Date().getFullYear()
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  numeroPaginas: {
    type: Number,
    required: true,
    min: 1
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
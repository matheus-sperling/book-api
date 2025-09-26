const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET /bookapi/v1/book - Listar todos os livros
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
  }
});

// GET /bookapi/v1/book/:id - Buscar livro por ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }
    res.json(book);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'ID inválido' });
    }
    res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
  }
});

// POST /bookapi/v1/book - Criar novo livro
router.post('/', async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Dados inválidos', error: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({ message: 'ISBN já existe' });
    }
    res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
  }
});

// PUT /bookapi/v1/book/:id - Atualizar livro
router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }
    res.json(book);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'ID inválido' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Dados inválidos', error: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({ message: 'ISBN já existe' });
    }
    res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
  }
});

// DELETE /bookapi/v1/book/:id - Deletar livro
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }
    res.json({ message: 'Livro deletado com sucesso' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'ID inválido' });
    }
    res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
  }
});

// GET /bookapi/v1/book/search/ano - Buscar por ano
router.get('/search/ano', async (req, res) => {
  try {
    const { ano } = req.query;
    if (!ano) {
      return res.status(400).json({ message: 'Parâmetro ano é obrigatório' });
    }
    const books = await Book.find({ anoPublicacao: parseInt(ano, 10) });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
  }
});

// GET /bookapi/v1/book/search/titulo - Buscar por título
router.get('/search/titulo', async (req, res) => {
  try {
    const { titulo, autor } = req.query;

    const query = {};

    if (titulo) {
      query.titulo = { $regex: titulo, $options: 'i' };
    }

    if (autor) {
      query.autor = { $regex: autor, $options: 'i' };
    }

    if (!titulo && !autor) {
      return res.status(400).json({ message: 'Pelo menos um parâmetro (titulo ou autor) é obrigatório' });
    }

    const books = await Book.find(query);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
  }
});

// GET /bookapi/v1/book/search/autor - Buscar por autor
router.get('/search/autor', async (req, res) => {
  try {
    const { autor } = req.query;
    if (!autor) {
      return res.status(400).json({ message: 'Parâmetro autor é obrigatório' });
    }
    const books = await Book.find({ autor: { $regex: autor, $options: 'i' } });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
  }
});

module.exports = router;

const BookService = require('../services/book.service');

exports.getBooks = async (req, res) => {
  try {
    const books = await BookService.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await BookService.getBookById(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const newBook = await BookService.createBook(req.body);
    res.status(201).json({ message: 'Libro creado correctamente', data: newBook });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await BookService.updateBook(req.params.id, req.body);
    res.status(200).json({ message: 'Libro actualizado', data: updatedBook });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const response = await BookService.deleteBook(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

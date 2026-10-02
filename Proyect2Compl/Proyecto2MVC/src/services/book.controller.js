const BookService = require('../services/book.service');

exports.getBooks = async (req, res, next) => {
  try {
    const result = await BookService.getAllBooks(req.query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
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

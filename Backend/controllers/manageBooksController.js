import manageBooks from '../models/ManageBooks.js';
import mongoose from 'mongoose';

//to create a book
const createBook = async (req, res) => {
   let image = `${req.file.filename}`;

   const { title, author, publisher, publication_date, isbn, quantity } = req.body;

   try {
      const Book = await manageBooks.create({ title, author, publisher, publication_date, isbn, quantity, image });
      res.status(200).json(Book);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
};

//To get all books
const getBooks = async (req, res) => {
   try {
      const books = await manageBooks.find({});
      res.status(200).json(books);
   }
   catch (e) {
      res.status(400).json({ error: e.message });
   }
};

//To get a single book
const getBook = async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Book not found' })
   }
   try {
      const book = await manageBooks.findById(id);
      res.status(200).json(book);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
};

//To update a Book details

const updateBook = async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Book not found' })
   }
   try {
      const book = await manageBooks.findByIdAndUpdate({ _id: id }, { ...req.body });
      res.status(200).json(book);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
};

//Delete a Book
const deleteBook = async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Book not found' })
   }
   try {
      const book = await manageBooks.findByIdAndDelete(id);
      res.status(200).json(book);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
};


export { createBook, getBooks, getBook, updateBook, deleteBook };



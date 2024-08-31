import manageBorrows from '../models/ManageBorrows.js';
import manageBooks from '../models/ManageBooks.js';
import mongoose from 'mongoose';


// Function to get borrow requests where status is false
const getBorrowRequests = async (req, res) => {
   try {
      const borrowRequests = await manageBorrows.find({ status: false });
      const requestsWithBookDetails = await Promise.all(borrowRequests.map(async (request) => {
         const bookDetails = await manageBooks.findOne({ isbn: request.isbn });
         return {
            title: bookDetails.title,
            author: bookDetails.author,
            isbn: request.isbn,
            stu_id: request.stu_ID,
            quantity: bookDetails.quantity,
            image: bookDetails.image
         };
      }));

      res.status(200).json(requestsWithBookDetails);
   }
   catch (e) {
      res.status(400).json({ error: e.message });
   }
};

//to create a borrow
const createBorrow = async (req, res) => {

   const { stu_ID, isbn, status } = req.body;

   try {
      const Borrow = await manageBorrows.create({ stu_ID, isbn, status });
      res.status(200).json(Borrow);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
};

//To get all borrows
const getBorrows = async (req, res) => {
   try {
      const borrows = await manageBorrows.find({});
      res.status(200).json(borrows);
   }
   catch (e) {
      res.status(400).json({ error: e.message });
   }
};

//To get a single borrow
const getBorrow = async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Borrow not found' })
   }
   try {
      const borrow = await manageBorrows.findById(id);
      res.status(200).json(borrow);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
};

//To update a Borrow details

const updateBorrow = async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Borrow not found' })
   }
   try {
      const borrow = await manageBorrows.findByIdAndUpdate({ _id: id }, { ...req.body });
      res.status(200).json(borrow);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
};

//Delete a Borrow
const deleteBorrow = async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Borrow not found' })
   }
   try {
      const borrow = await manageBorrows.findByIdAndDelete(id);
      res.status(200).json(borrow);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
};


export { getBorrowRequests, createBorrow, getBorrows, getBorrow, updateBorrow, deleteBorrow };



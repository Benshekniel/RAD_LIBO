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
            _id: request._id,
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

// Function to update the borrow status
const updateBorrowStatus = async (req, res) => {
   const { id } = req.params;

   try {
      const updatedBorrow = await manageBorrows.findByIdAndUpdate(id, { status: true }, { new: true });
      if (!updatedBorrow) {
         return res.status(404).json({ error: "Borrow request not found" });
      }
      res.status(200).json(updatedBorrow);
   } catch (e) {
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

// Function to check if the borrow request already exists
const checkBorrowRequest = async (req, res) => {
   const { stu_ID, isbn } = req.params;

   try {
      const existingBorrow = await manageBorrows.findOne({ stu_ID, isbn, status: false });
      res.status(200).json({ exists: !!existingBorrow });
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
};



export { checkBorrowRequest, updateBorrowStatus, getBorrowRequests, createBorrow, getBorrows, getBorrow, updateBorrow, deleteBorrow };



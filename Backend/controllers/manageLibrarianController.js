import manageLibrarians from '../models/ManageLibrarians.js';
import mongoose from 'mongoose';

//to create a student
const createLibrarian = async (req, res) => {

   const { name, email, password } = req.body;

   try {
      const Librarian = await manageLibrarians.create({ name, email, password });
      res.status(200).json(Librarian);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
};



//To get a single student
const getLibrarian = async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Librarian not found' })
   }
   try {
      const student = await manageLibrarians.findById(id);
      res.status(200).json(student);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
};






export { createLibrarian, getLibrarian };



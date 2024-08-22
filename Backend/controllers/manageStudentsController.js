import manageStudents from '../models/ManageStudents.js';
import mongoose from 'mongoose';

//to create a student
const createStudent = async (req, res) => {
   let image = `${req.file.filename}`;

   const { name, email, stu_ID, year } = req.body;

   try {
      const Student = await manageStudents.create({ name, email, stu_ID, year, image });
      res.status(200).json(Student);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
};

//To get all students
const getStudents = async (req, res) => {
   try {
      const students = await manageStudents.find({});
      res.status(200).json(students);
   }
   catch (e) {
      res.status(400).json({ error: e.message });
   }
};

//To get a single student
const getStudent = async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Student not found' })
   }
   try {
      const student = await manageStudents.findById(id);
      res.status(200).json(student);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
};

//To update a Student details

const updateStudent = async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Student not found' })
   }
   try {
      const student = await manageStudents.findByIdAndUpdate({ _id: id }, { ...req.body });
      res.status(200).json(student);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
};

//Delete a Student
const deleteStudent = async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Student not found' })
   }
   try {
      const student = await manageStudents.findByIdAndDelete(id);
      res.status(200).json(student);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
};


export { createStudent, getStudents, getStudent, updateStudent, deleteStudent };



import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import manageStudents from '../models/ManageStudents.js';


// Register Student
const registerStudent = async (req, res) => {
   const { name, email, password, stu_ID, year } = req.body;
   let image = `${req.file.filename}`;

   try {
      const existingStudent = await manageStudents.findOne({ email });
      if (existingStudent) {
         return res.status(400).json({ message: "Student already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newStudent = new manageStudents({ name, email, password: hashedPassword, stu_ID, year, image });

      await newStudent.save();
      res.status(201).json({ message: "Student registered successfully" });
   } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
   }
};

// Login Student
const loginStudent = async (req, res) => {
   const { email, password } = req.body;

   try {
      const student = await manageStudents.findOne({ email });
      if (!student) {
         return res.status(404).json({ message: "Student not found" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, student.password);
      if (!isPasswordCorrect) {
         return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ email: student.email, id: student._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.status(200).json({ result: student, token });
   } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
   }
};

// Get student by email
const getStudentByEmail = async (req, res) => {
   const { email } = req.params;
   try {
      const student = await manageStudents.findOne({ email });
      if (student) {
         return res.status(200).json({
            stu_ID: student.stu_ID,
            name: student.name,
            image: student.image
         });
      } else {
         return res.status(404).json({ message: "Student not found" });
      }
   } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
   }
};



// To get all students
const getStudents = async (req, res) => {
   try {
      const students = await manageStudents.find({});
      res.status(200).json(students);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
};

// To get a single student
const getStudent = async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Student not found' });
   }
   try {
      const student = await manageStudents.findById(id);
      res.status(200).json(student);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
};

// To update a student’s details
const updateStudent = async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Student not found' });
   }
   try {
      const student = await manageStudents.findByIdAndUpdate({ _id: id }, { ...req.body });
      res.status(200).json(student);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
};

// Delete a student
const deleteStudent = async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Student not found' });
   }
   try {
      const student = await manageStudents.findByIdAndDelete(id);
      res.status(200).json(student);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
};

// Search students by name
const searchStudentsByName = async (req, res) => {
   const { name } = req.params;
   try {
      const students = await manageStudents.find({ name: { $regex: name, $options: 'i' } });
      res.status(200).json(students);
   } catch (err) {
      res.status(500).json({ error: 'Server Error' });
   }
};

export {
   registerStudent,
   loginStudent,
   getStudents,
   getStudent,
   getStudentByEmail,
   updateStudent,
   deleteStudent,
   searchStudentsByName
};

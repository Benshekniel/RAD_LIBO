import Librarian from "../models/ManageLibrarians.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register Librarian
export const registerLibrarian = async (req, res) => {
   const { email, password } = req.body;

   try {
      const existingLibrarian = await Librarian.findOne({ email });
      if (existingLibrarian) {
         return res.status(400).json({ message: "Librarian already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newLibrarian = new Librarian({ email, password: hashedPassword });

      await newLibrarian.save();
      res.status(201).json({ message: "Librarian registered successfully" });
   } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
   }
};

// Login Librarian
export const loginLibrarian = async (req, res) => {
   const { email, password } = req.body;

   try {
      const librarian = await Librarian.findOne({ email });
      if (!librarian) {
         return res.status(404).json({ message: "Librarian not found" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, librarian.password);
      if (!isPasswordCorrect) {
         return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ email: librarian.email, id: librarian._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.status(200).json({ result: librarian, token });
   } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
   }
};

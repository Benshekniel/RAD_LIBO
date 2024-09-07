import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Student from '../models/ManageStudents.js';
import Librarian from '../models/ManageLibrarians.js';

export const loginUser = async (req, res) => {
   const { email, password, role } = req.body;

   try {
      const UserModel = role === 'student' ? Student : Librarian;
      const user = await UserModel.findOne({ email });

      if (!user) {
         return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
         return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Sign JWT
      const token = jwt.sign(
         { id: user._id, role },
         process.env.JWT_SECRET,
         { expiresIn: '1h' }
      );

      // Set JWT as an HttpOnly cookie
      res.cookie('token', token, {
         httpOnly: true, // Accessible only by the web server
         secure: process.env.NODE_ENV === 'production', // Send only over HTTPS
         sameSite: 'strict', // Prevent CSRF
         secure: false,
         maxAge: 3600000 // 1 hour
      });

      // Send token in the response
      res.status(200).json({ token, role }); // Add token to response
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

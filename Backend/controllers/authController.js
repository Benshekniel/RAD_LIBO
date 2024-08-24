import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Student from '../models/ManageStudents.js';
import Librarian from '../models/ManageLibrarians.js';

export const loginUser = async (req, res) => {
   const { email, password, role } = req.body;

   try {
      const UserModel = role === 'User' ? Student : Librarian;
      const user = await UserModel.findOne({ email });

      if (!user) {
         return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
         return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
         { id: user._id, role },
         process.env.JWT_SECRET,
         { expiresIn: '1h' }
      );

      res.status(200).json({ token, role });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

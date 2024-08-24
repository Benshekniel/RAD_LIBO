import mongoose from 'mongoose';

const { Schema } = mongoose;

const ManageLibrarians = new Schema({
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   }
});

export default mongoose.model('Librarian', ManageLibrarians);

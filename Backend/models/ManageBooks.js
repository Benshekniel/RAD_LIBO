import mongoose from "mongoose";

const { Schema } = mongoose;

const ManageBooks = new Schema({
   title: {
      type: String,
      required: true,
   },
   author: {
      type: String,
      required: true,
   },
   publisher: {
      type: String,
      required: true,
   },
   publication_date: {
      type: String,
      required: true,
   },
   isbn: {
      type: String,
      required: true,
   },
   quantity: {
      type: Number,
      required: true,
   },
});

export default mongoose.model("Book", ManageBooks);

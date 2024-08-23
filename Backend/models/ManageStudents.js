import mongoose from "mongoose";

const { Schema } = mongoose;

const ManageStudents = new Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   stu_ID: {
      type: String,
      required: true,
   },
   year: {
      type: String,
      required: true,
   },
   image: {
      type: String,
      required: true,
   }
});

export default mongoose.model("Student", ManageStudents);

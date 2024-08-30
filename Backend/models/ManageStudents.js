import mongoose from "mongoose";

const { Schema } = mongoose;

const ManageStudents = new Schema({
   name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
   },
   email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
   },
   password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      validate: {
         validator: function (v) {
            return /(?=.*\d)(?=.*[!@#$%^&*])/.test(v);
         },
         message: (props) =>
            "Password must contain at least one number and one special character",
      },
   },
   stu_ID: {
      type: String,
      required: [true, "Student ID is required"],
      unique: true,
   },
   year: {
      type: String,
      required: [true, "Year is required"],
      enum: {
         values: ["1st", "2nd", "3rd", "4th"],
         message: "{VALUE} is not a valid year",
      },
   },
   image: {
      type: String,
      required: [true, "Image is required"],
   },
});

export default mongoose.model("Student", ManageStudents);

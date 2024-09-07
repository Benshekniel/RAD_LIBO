import mongoose from "mongoose";

const { Schema } = mongoose;

const ManageBorrows = new Schema(
   {
      stu_ID: {
         type: String,
         required: true,
      },
      isbn: {
         type: String,
         required: true,
      },
      status: {
         type: String,
         required: true,
      },
      dateOfRequest: {
         type: Date,
         default: Date.now,  // Automatically set the current date when the request is created
      },
   },
   { timestamps: true }

);

export default mongoose.model("Borrow", ManageBorrows);

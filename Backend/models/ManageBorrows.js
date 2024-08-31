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
      }
   },
   { timestamps: true }

);

export default mongoose.model("Borrow", ManageBorrows);

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
      issuedStatus: {
         type: String,
         required: true,
         default: "Not Issued",
      },
      dateOfRequest: {
         type: Date,
         default: Date.now,
      },
   },

);

export default mongoose.model("Borrow", ManageBorrows);

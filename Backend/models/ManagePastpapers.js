import mongoose from "mongoose";

const { Schema } = mongoose;

const ManagePastpapers = new Schema({
   cs_is: {
      type: String,
      required: true,
   },
   year: {
      type: String,
      required: true,
   },
   semister: {
      type: String,
      required: true,
   },
   subject: {
      type: String,
      required: true,
   },
   subject_code: {
      type: String,
      required: true,
   },
   examination_year: {
      type: String,
      required: true,
   },
   image: {
      type: String,
      required: true,
   },
});

export default mongoose.model("Pastpaper", ManagePastpapers);
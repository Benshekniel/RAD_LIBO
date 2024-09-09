import managePastpapers from '../models/ManagePastpapers.js';
import mongoose from 'mongoose';

// To create a pastpaper
const createPastpaper = async (req, res) => {
   let image = `${req.file.filename}`;

   const { cs_is, year, semister, subject, subject_code, examination_year } = req.body;

   try {
      const Pastpaper = await managePastpapers.create({ cs_is, year, semister, subject, subject_code, examination_year, image });
      res.status(200).json(Pastpaper);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
};

// To get all pastpapers with availability status
const getPastpapers = async (req, res) => {
   try {
      const pastpapers = await managePastpapers.find({});
      const pastpapersWithAvailability = pastpapers.map((pastpaper) => ({
         ...pastpaper._doc,
         availability: pastpaper.cs_is > 0,
      }));
      res.status(200).json(pastpapersWithAvailability);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
};

// To get a single pastpaper
const getPastpaper = async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Pastpaper not found' });
   }
   try {
      const pastpaper = await managePastpapers.findById(id);
      const pastpaperWithAvailability = {
         ...pastpaper._doc,
         availability: pastpaper.cs_is > 0,
      };
      res.status(200).json(pastpaperWithAvailability);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
};

// To update a pastpaper's details
const updatePastpaper = async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Pastpaper not found' });
   }
   try {
      const pastpaper = await managePastpapers.findByIdAndUpdate({ _id: id }, { ...req.body });
      res.status(200).json(pastpaper);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
};

// Delete a pastpaper
const deletePastpaper = async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Pastpaper not found' });
   }
   try {
      const pastpaper = await managePastpapers.findByIdAndDelete(id);
      res.status(200).json(pastpaper);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
};

// Search pastpapers by year
const searchPastpapersByYear = async (req, res) => {
   const { year } = req.params;
   try {
      const pastpapers = await managePastpapers.find({ year: { $regex: year, $options: 'i' } });
      res.status(200).json(pastpapers);
   } catch (err) {
      res.status(500).json({ error: 'Server Error' });
   }
};

export { createPastpaper, getPastpapers, getPastpaper, updatePastpaper, deletePastpaper, searchPastpapersByYear };
import express from 'express';
import { createPastpaper, getPastpapers, getPastpaper, updatePastpaper, deletePastpaper, searchPastpapersByYear } from '../controllers/managePastpapersController.js';
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';
import path from 'path';

const app = express();

//store image file
const Storage = multer.diskStorage({
   destination: "image",
   filename: (req, file, cb) => {
      cb(null, "pastpaper_" + Date.now() + path.extname(file.originalname))
   }

})

const upload = multer({
   storage: Storage
})

app.use('/image', express.static('image'));

const router = express.Router();

router.post('/add', upload.single('image'), createPastpaper)
router.get('/', getPastpapers);
router.get('/:id', getPastpaper);
router.patch('/:id', updatePastpaper);
router.delete('/:id', deletePastpaper);
router.get('/search', searchPastpapersByYear);

export default router;
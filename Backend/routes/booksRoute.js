import express from 'express';
import { createBook, getBooks, getBook, updateBook, deleteBook } from '../controllers/manageBooksController.js';
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';
import path from 'path';

const app = express();

//store image file
const Storage = multer.diskStorage({
   destination: "image",
   filename: (req, file, cb) => {
      cb(null, "book_" + Date.now() + path.extname(file.originalname))
   }

})

const upload = multer({
   storage: Storage
})

app.use('/image', express.static('image'));

const router = express.Router();

router.post('/add', protect, upload.single('image'), createBook)
router.get('/', getBooks);
router.get('/:id', getBook);
router.patch('/:id', protect, updateBook);
router.delete('/:id', protect, deleteBook);

export default router;

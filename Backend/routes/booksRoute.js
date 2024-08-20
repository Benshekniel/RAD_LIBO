import express from 'express';
import { createBook, getBooks, getBook, updateBook, deleteBook } from '../controllers/manageBooksController.js';
import multer from 'multer';
import path from 'path';

const app = express();

//store image file
const Storage = multer.diskStorage({
   destination: "image",
   filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
   }

})

const upload = multer({
   storage: Storage
})

app.use('/image', express.static('image'));

const router = express.Router();

router.post('/add', upload.single('image'), createBook)
router.get('/', getBooks);
router.get('/:id', getBook);
router.patch('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;

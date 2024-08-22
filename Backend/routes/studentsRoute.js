import express from 'express';
import { createStudent, getStudents, getStudent, updateStudent, deleteStudent } from '../controllers/manageStudentsController.js';
import multer from 'multer';
import path from 'path';

const app = express();

//store image file
const Storage = multer.diskStorage({
   destination: "image",
   filename: (req, file, cb) => {
      cb(null, "stu_" + Date.now() + path.extname(file.originalname))
   }

})

const upload = multer({
   storage: Storage
})

app.use('/image', express.static('image'));

const router = express.Router();

router.post('/add', upload.single('image'), createStudent)
router.get('/', getStudents);
router.get('/:id', getStudent);
router.patch('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;

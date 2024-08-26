import express from 'express';
import { loginStudent, registerStudent, getStudentByEmail, getStudents, getStudent, updateStudent, deleteStudent } from '../controllers/manageStudentsController.js';
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

router.post('/register', upload.single('image'), registerStudent)
router.post('/login', loginStudent)
router.get('/', getStudents);
router.get('/:id', getStudent);
router.patch('/:id', updateStudent);
router.delete('/:id', deleteStudent);
router.get('/email/:id', getStudentByEmail);

export default router;

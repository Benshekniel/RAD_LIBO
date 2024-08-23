import express from 'express';
import { createLibrarian, getLibrarian } from '../controllers/manageLibrarianController.js';

const router = express.Router();

router.post('/add', createLibrarian)
router.get('/:id', getLibrarian);


export default router;

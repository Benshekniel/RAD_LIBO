import express from 'express';
import { createBorrow, getBorrows, getBorrow, updateBorrow, deleteBorrow } from '../controllers/manageBorrowsController.js';

const router = express.Router();

router.post('/add', createBorrow)
router.get('/', getBorrows);
router.get('/:id', getBorrow);
router.patch('/:id', updateBorrow);
router.delete('/:id', deleteBorrow);

export default router;

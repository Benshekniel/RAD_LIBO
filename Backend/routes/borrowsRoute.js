import express from 'express';
import { getAcceptedBorrowRequests, getBorrowRequestsByStudent, checkBorrowRequest, updateBorrowStatus, getBorrowRequests, createBorrow, getBorrows, getBorrow, updateBorrow, deleteBorrow } from '../controllers/manageBorrowsController.js';

const router = express.Router();

router.post('/add', createBorrow)
router.get('/', getBorrows);
router.get('/:id', getBorrow);
router.patch('/:id', updateBorrow);
router.delete('/:id', deleteBorrow);
router.get('/requests/pending', getBorrowRequests);
router.patch('/requests/:id', updateBorrowStatus);
router.get('/requests/:stu_ID', getBorrowRequestsByStudent);
router.get('/accepted/:stu_ID', getAcceptedBorrowRequests);
router.get('/check/:stu_ID/:isbn', checkBorrowRequest);
export default router;

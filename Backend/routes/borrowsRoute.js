import express from 'express';
import { updateIssuedStatus, getBorrowAcceptedRequests, getAcceptedBorrowRequests, getBorrowRequestsByStudent, checkBorrowRequest, updateBorrowStatus, getBorrowRequests, createBorrow, getBorrows, getBorrow, updateBorrow, deleteBorrow } from '../controllers/manageBorrowsController.js';

const router = express.Router();

router.post('/add', createBorrow)
router.get('/', getBorrows);
router.get('/:id', getBorrow);
router.patch('/:id', updateBorrow);
router.delete('/:id', deleteBorrow);
router.get('/requests/pending', getBorrowRequests);
router.get('/requests/accepted', getBorrowAcceptedRequests);
router.patch('/requests/:id', updateBorrowStatus);
router.get('/requests/:stu_ID', getBorrowRequestsByStudent);
router.get('/accepted/:stu_ID', getAcceptedBorrowRequests);
router.get('/check/:stu_ID/:isbn', checkBorrowRequest);
router.patch('/issued/:id', updateIssuedStatus);

export default router;

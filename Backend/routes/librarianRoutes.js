import express from "express";
import { loginLibrarian, registerLibrarian } from "../controllers/librarianController.js";

const router = express.Router();

router.post("/login", loginLibrarian);
router.post("/register", registerLibrarian);

export default router;

import express from "express";
import { saveBooks } from "../controllers/books.controller.js";
import { isAuthenticated } from   "../middleware/isAuthenticated.js"
const router = express.Router();

router.post('/save-book',isAuthenticated, saveBooks)

export default router;
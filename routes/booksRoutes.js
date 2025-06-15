const express = require('express');
const { getAllBooks, createBook } = require('../controllers/booksController');
const router = express.Router();

router.get("/allBooks", getAllBooks);
router.post("/newBook", createBook);

module.exports = router;
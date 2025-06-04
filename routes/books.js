const express = require("express");
const books = require("../models/books");
const router = express.Router();

router.get("/books", async (req, res) => {
  const booksList = await books.find();
  return res.json("books", {
    books: booksList,
    user: req.user,
  });
});

router.post("/books", async (req, res) => {
  const { title, author, description } = req.body;
  await books.create({
    title,
    author,
    description,
  });
  return res.redirect("/books");
});

// get book details by id
router.get("/books/:id", async (req, res) => {
  const book = await books.findById(req.params.id);
  if (!book) {
    return res.status(404).send("Book not found");
  }
  return res.json("bookDetails", {
    book,
    user: req.user,
  });
});

router.post("/books/:id/reviews", async (req, res) => {
  const { review } = req.body;
  const book = await books.findById(req.params.id);
  console.log("Book found:", book);
  if (!book) {
    return res.status(404).send("Book not found");
  }

  book.reviews.push({
    user: req.user._id,
    review,
  });

  await book.save();

  return res.json({
    success: true,
    message: "Review added successfully",
    bookId: book._id,
  });
});

router.put("/reviews/:id", async (req, res) => {
  const { review } = req.body;
  const book = await books.findOne({ "reviews._id": req.params.id });

  if (!book) {
    return res.status(404).send("Review not found");
  }

  const reviewToUpdate = book.reviews.id(req.params.id);
  if (!reviewToUpdate) {
    return res.status(404).send("Review not found");
  }

  reviewToUpdate.review = review;
  await book.save();

  return res.redirect(`/books/${book._id}`);
});

router.delete("/reviews/:id", async (req, res) => {
  const book = await books.findOne({ "reviews._id": req.params.id });

  if (!book) {
    return res.status(404).send("Review not found");
  }

  const reviewToDelete = book.reviews.id(req.params.id);
  if (!reviewToDelete) {
    return res.status(404).send("Review not found");
  }

  reviewToDelete.remove();
  await book.save();

  return res.redirect(`/books/${book._id}`);
});

router.get("/search", async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).send("Query parameter is required");
  }

  const booksList = await books.find({
    $or: [
      { title: new RegExp(query, "i") }, // Case-insensitive search
      { author: new RegExp(query, "i") }, // Case-insensitive search
      { description: new RegExp(query, "i") }, // Case-insensitive search
    ],
  });

  return res.json({
    success: true,
    books: booksList,
  });
});

module.exports = router;

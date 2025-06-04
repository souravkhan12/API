const express = require("express");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const {
  handleUserSignup,
  handleUserLogin,
} = require("./controller/authController");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");
const booksRouter = require("./routes/books");

const app = express();
const PORT = process.env.PORT || 8001;
require("dotenv").config();

connectToMongoDB(process.env.MONGODB_URI).then(() =>
  console.log("Mongodb connected")
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(booksRouter, restrictToLoggedinUserOnly);

app.post("/signup", handleUserSignup);
app.post("/login", handleUserLogin);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));

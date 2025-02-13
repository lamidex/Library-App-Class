import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  publishedDate: {
    type: Date,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  availableCopies: {
    type: Number,
    required: true,
    default: 1,
  },
}, {
  timestamps: true,
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
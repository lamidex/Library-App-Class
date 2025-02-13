import { errorResMsg, successResMsg } from "../utils/lib/response.js";
import logger from "../utils/log/logger.js";
import Admin from "../models/admin.js";
import Book from "../models/book.models.js";
import { v4 as uuidv4 } from 'uuid';

export const saveBooks = async (req, res) => {
  const { title, author, publishedDate, genre, availableCopies } = req.body;
  const email = req.user.email;
  try {
    if (!title || !author || !publishedDate || !genre || !availableCopies) {
      return res
        .status(400)
        .json({ message: "Please Fill All Required Fields" });
    }
    const admin = await Admin.findOne({email: email});
    if (!admin) {
      return errorResMsg(res, 403, "Unauthorized");
    }
    if (admin.role !== "superAdmin") {
      return errorResMsg(res, 403, "Unauthorized: You are not a super admin");
    }
    const isbn = uuidv4();
    const book = await Book.create({
      title,
      author,
      publishedDate,
      genre,
      isbn,
      availableCopies,
    });
    return successResMsg(res, 201, {
      message: "Book created successfully",
      book,
    });
  } catch (e) {
    logger.error(e);
    return errorResMsg(res, 500, "Internal Server Error");
  }
};
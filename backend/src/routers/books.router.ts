import { validateBookWishlist } from "../middlewares/books.middleware";
import { Router } from "express";
import { authenticateToken } from "../middlewares/authentication.middleware";
import {
  deleteBookWishList,
  getUserBooksWishlist,
  postBookWishlist,
} from "../controllers/books.controller";

const booksRouter = Router();

booksRouter
  .all("/*", authenticateToken)
  .get("", getUserBooksWishlist)
  .post("", validateBookWishlist, postBookWishlist)
  .delete("", deleteBookWishList);

export { booksRouter };

import { validateFilmAndTvWishlist } from "../middlewares/films_tv.middleware";
import { Router } from "express";
import { authenticateToken } from "../middlewares/authentication.middleware";
import {
  deleteFilmWishList,
  getUserFilmsWishlist,
  postFilmWishlist,
} from "../controllers/films.controller";

const filmsRouter = Router();

filmsRouter
  .all("/*", authenticateToken)
  .get("", getUserFilmsWishlist)
  .post("", validateFilmAndTvWishlist, postFilmWishlist)
  .delete("", deleteFilmWishList);

export { filmsRouter };

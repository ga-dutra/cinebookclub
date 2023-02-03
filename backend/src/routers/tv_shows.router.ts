import { validateFilmAndTvWishlist } from "../middlewares/films_tv.middleware";
import { Router } from "express";
import { authenticateToken } from "../middlewares/authentication.middleware";
import {
  deleteTvShowWishList,
  getUserTvShowsWishlist,
  postTvShowWishlist,
} from "../controllers/tv_shows.controller";

const tvShowsRouter = Router();

tvShowsRouter
  .all("/*", authenticateToken)
  .get("", getUserTvShowsWishlist)
  .post("", validateFilmAndTvWishlist, postTvShowWishlist)
  .delete("", deleteTvShowWishList);

export { tvShowsRouter };

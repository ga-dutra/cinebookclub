import { newFilm_TvSchema } from "../schemas/films_tv.schema";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authentication.middleware";
import { FilmWishListIncomplete } from "../services/films.service";
import wishlistsRepository from "../repositories/wishlists.repository";

async function validateFilmAndTvWishlist(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const newFilmOrTvWishList: FilmWishListIncomplete = req.body;
  const { userId } = req;

  const newFilmOrTvWishListValidation = newFilm_TvSchema.validate(
    newFilmOrTvWishList,
    {
      abortEarly: false,
    }
  );
  if (newFilmOrTvWishListValidation.error) {
    const errors = newFilmOrTvWishListValidation.error.details.map(
      (details) => details.message
    );
    return res.status(422).send(errors);
  }

  try {
    const existingFilmWishList = await wishlistsRepository.findByFilmAndUserId(
      newFilmOrTvWishList.api_id,
      userId
    );
    const existingTvWishList = await wishlistsRepository.findByTvAndUserId(
      newFilmOrTvWishList.api_id,
      userId
    );

    if (existingFilmWishList || existingTvWishList) {
      return res
        .status(409)
        .send({ error: "Item already exists in wishlist!" });
    }
    next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export { validateFilmAndTvWishlist };

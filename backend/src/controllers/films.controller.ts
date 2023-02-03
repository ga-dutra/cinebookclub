import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication.middleware";
import httpStatus from "http-status";
import filmsService, {
  FilmWishListIncomplete,
} from "../services/films.service";

export async function getUserFilmsWishlist(
  req: AuthenticatedRequest,
  res: Response
) {
  const { userId } = req;
  try {
    const userFilmsWishList = await filmsService.getUserFilmsWishlist(userId);
    return res.status(httpStatus.OK).send(userFilmsWishList);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postFilmWishlist(
  req: AuthenticatedRequest,
  res: Response
) {
  const { userId } = req;

  const userFilmWishList: FilmWishListIncomplete = {
    ...req.body,
    user_id: userId,
    medias_id: 2,
  };

  if (!userFilmWishList) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const newFilmWishList = await filmsService.postFilmsWishList(
      userFilmWishList
    );
    return res.status(httpStatus.CREATED).send(newFilmWishList);
  } catch (error) {
    console.log(error);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function deleteFilmWishList(
  req: AuthenticatedRequest,
  res: Response
) {
  const { userId } = req;
  const { api_id } = req.body;

  if (!api_id) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ error: "api_id is necessary" });
  }

  try {
    await filmsService.deleteFilmWishList(api_id, userId);
    return res
      .status(httpStatus.OK)
      .send({ message: "film in wishlist deleted" });
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

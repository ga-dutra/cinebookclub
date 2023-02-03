import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication.middleware";
import httpStatus from "http-status";
import tvShowsService, {
  TvShowWishListIncomplete,
} from "../services/tv_shows.service";

export async function getUserTvShowsWishlist(
  req: AuthenticatedRequest,
  res: Response
) {
  const { userId } = req;
  try {
    const userTvShowsWishList = await tvShowsService.getUserTvShowsWishlist(
      userId
    );
    return res.status(httpStatus.OK).send(userTvShowsWishList);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postTvShowWishlist(
  req: AuthenticatedRequest,
  res: Response
) {
  const { userId } = req;

  const userTvShowWishList: TvShowWishListIncomplete = {
    ...req.body,
    user_id: userId,
    medias_id: 3,
  };

  if (!userTvShowWishList) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const newTvShowWishList = await tvShowsService.postTvShowWishList(
      userTvShowWishList
    );
    return res.status(httpStatus.CREATED).send(newTvShowWishList);
  } catch (error) {
    console.log(error);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function deleteTvShowWishList(
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
    await tvShowsService.deleteTvShowWishlist(api_id, userId);
    return res
      .status(httpStatus.OK)
      .send({ message: "tv show in wishlist deleted" });
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

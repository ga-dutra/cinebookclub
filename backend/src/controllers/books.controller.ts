import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication.middleware";
import httpStatus from "http-status";
import booksService from "../services/books.service";
import { Reading } from "../repositories/readings.repository";

export async function getUserBooksWishlist(
  req: AuthenticatedRequest,
  res: Response
) {
  const { userId } = req;
  try {
    const userBooksWishList = await booksService.getUserBooksWishlist(userId);
    return res.status(httpStatus.OK).send(userBooksWishList);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postBookWishlist(
  req: AuthenticatedRequest,
  res: Response
) {
  const { userId } = req;
  const userBookWishList: Reading = {
    ...req.body,
    user_id: userId,
    medias_id: 1,
  };

  if (!userBookWishList) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const newBookWishList = await booksService.postBookWishList(
      userBookWishList
    );

    return res.status(httpStatus.CREATED).send(newBookWishList);
  } catch (error) {
    console.log(error);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function deleteBookWishList(
  req: AuthenticatedRequest,
  res: Response
) {
  const { userId } = req;
  const { book_api_id } = req.body;

  if (!book_api_id) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ error: "book_api_id is necessary" });
  }

  try {
    await booksService.deleteBookWishList(userId, book_api_id);
    return res
      .status(httpStatus.OK)
      .send({ message: "book in wishlist deleted" });
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

import { newReadingSchema } from "../schemas/readings.schema";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authentication.middleware";
import { Reading } from "../repositories/readings.repository";
import wishlistsRepository from "../repositories/wishlists.repository";

async function validateBookWishlist(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const newBookWishList: Reading = req.body;
  const { userId } = req;

  const newBookWishListValidation = newReadingSchema.validate(newBookWishList, {
    abortEarly: false,
  });
  if (newBookWishListValidation.error) {
    const errors = newBookWishListValidation.error.details.map(
      (details) => details.message
    );
    return res.status(422).send(errors);
  }

  try {
    const existingBookWishList = await wishlistsRepository.findByBookAndUserId(
      newBookWishList.book_api_id,
      userId
    );

    if (existingBookWishList) {
      return res
        .status(409)
        .send({ error: "Book already exists in wishlist!" });
    }
    next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export { validateBookWishlist };

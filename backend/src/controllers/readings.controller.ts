import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication.middleware";
import httpStatus from "http-status";
import readingService from "../services/readings.service";
import { Reading } from "../repositories/readings.repository";

export async function getUserReadings(
  req: AuthenticatedRequest,
  res: Response
) {
  const { userId } = req;

  try {
    const userReading = await readingService.getUserReadings(userId);
    return res.status(httpStatus.OK).send(userReading);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postReading(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const userReading: Reading = { ...req.body, user_id: userId, medias_id: 1 };

  if (!userReading) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  try {
    const newUserReading = await readingService.postReading(userReading);

    return res.status(httpStatus.CREATED).send(newUserReading);
  } catch (error) {
    console.log(error);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function updateGradeOrReviewOrDate(
  req: AuthenticatedRequest,
  res: Response
) {
  const { userId } = req;
  const { readingId } = req.params;
  const { book_api_id, newGrade, newReview, newReadingDate } = req.body;

  if (!newGrade && !newReview && !newReadingDate) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  let gradeUpdated;
  let reviewUpdated;
  let dateUpdated;
  let adaptedNewDate;
  if (newReadingDate) {
    adaptedNewDate = adaptDate(newReadingDate);
  }
  try {
    gradeUpdated = await readingService.updateGrade(
      newGrade,
      userId,
      book_api_id
    );

    reviewUpdated = await readingService.updateReview(
      newReview,
      userId,
      book_api_id
    );

    dateUpdated = await readingService.updateReadingDate(
      adaptedNewDate,
      userId,
      book_api_id
    );

    return res.status(200).send({ gradeUpdated, reviewUpdated, dateUpdated });
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function deleteReading(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { book_api_id } = req.body;

  if (!book_api_id) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ error: "book_api_id is necessary" });
  }

  try {
    await readingService.deleteReading(userId, book_api_id);
    return res.status(httpStatus.OK).send({ message: "reading deleted" });
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

function adaptDate(newReadingDate: string) {
  let splitArray;
  if (newReadingDate.includes(",")) {
    splitArray = newReadingDate.split(",");
  } else if (newReadingDate.includes("-")) {
    splitArray = newReadingDate.split("-");
  }
  return new Date(
    Number(splitArray[0]),
    Number(splitArray[1]) - 1,
    Number(splitArray[2])
  );
}

import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication.middleware";
import httpStatus from "http-status";
import watchingService from "../services/watchings.service";
import { Watching } from "../repositories/watchings.repository";

export async function getUserWatchings(
  req: AuthenticatedRequest,
  res: Response
) {
  const { userId } = req;
  const { medias_id } = req.params;

  if (!medias_id) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ error: "medias_id is necessary" });
  } else if (![2, 3].includes(Number(medias_id))) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ error: "medias_id must be 2 or 3" });
  }
  try {
    const userWatchings = await watchingService.getUserWatchings(
      userId,
      Number(medias_id)
    );
    return res.status(httpStatus.OK).send(userWatchings);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postWatching(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const userWatching: Watching = { ...req.body, user_id: userId };
  if (![2, 3].includes(userWatching.medias_id)) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ error: "medias_id must be 2 or 3" });
  }
  if (!userWatching) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  try {
    const newUserWatching = await watchingService.postWatching(userWatching);

    return res.status(httpStatus.CREATED).send(newUserWatching);
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
  const { watchingId } = req.params;
  const { medias_id, api_id, newGrade, newReview, newWatchingDate } = req.body;

  if (!medias_id) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ error: "medias_id is necessary" });
  } else if (![2, 3].includes(medias_id)) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ error: "medias_id must be 2 or 3" });
  }
  if (!newGrade && !newReview && !newWatchingDate) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  let gradeUpdated;
  let reviewUpdated;
  let dateUpdated;
  let adaptedNewDate;
  if (newWatchingDate) {
    adaptedNewDate = adaptDate(newWatchingDate);
  }
  try {
    gradeUpdated = await watchingService.updateGrade(
      newGrade,
      userId,
      api_id,
      medias_id
    );

    reviewUpdated = await watchingService.updateReview(
      newReview,
      userId,
      api_id,
      medias_id
    );

    dateUpdated = await watchingService.updateWatchingDate(
      adaptedNewDate,
      userId,
      api_id,
      medias_id
    );

    return res.status(200).send({ gradeUpdated, reviewUpdated, dateUpdated });
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function deleteWatching(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { medias_id, api_id } = req.body;
  if (!medias_id || !api_id) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ error: "medias_id and api_id are required" });
  }

  try {
    await watchingService.deleteWatching(userId, api_id, medias_id);
    return res.status(httpStatus.OK).send({ message: "user watching deleted" });
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

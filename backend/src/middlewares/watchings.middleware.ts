import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authentication.middleware";
import { newWatchingSchema } from "../schemas/watchings.schema";
import watchingsRepository, {
  Watching,
} from "../repositories/watchings.repository";

async function validateWatching(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const newWatching: Watching = req.body;
  const { userId } = req;

  const newWatchingValidation = newWatchingSchema.validate(newWatching, {
    abortEarly: false,
  });
  if (newWatchingValidation.error) {
    const errors = newWatchingValidation.error.details.map(
      (details) => details.message
    );
    return res.status(422).send(errors);
  }

  try {
    const existingUserWatching = await watchingsRepository.findByMediaAndUserId(
      newWatching.api_id,
      userId,
      newWatching.medias_id
    );

    if (existingUserWatching) {
      return res.status(409).send({ error: "Watching already exists!" });
    }
    next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export { validateWatching };

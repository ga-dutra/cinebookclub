import { newReadingSchema } from "../schemas/readings.schema";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authentication.middleware";
import readingRepository, {
  Reading,
} from "../repositories/readings.repository";

async function validateReading(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const newReading: Reading = req.body;
  const { userId } = req;

  const newReadingValidation = newReadingSchema.validate(newReading, {
    abortEarly: false,
  });
  if (newReadingValidation.error) {
    const errors = newReadingValidation.error.details.map(
      (details) => details.message
    );
    return res.status(422).send(errors);
  }

  try {
    const existingUserReading = await readingRepository.findByBookAndUserId(
      newReading.book_api_id,
      userId
    );

    if (existingUserReading) {
      return res.status(409).send({ error: "Reading already exists!" });
    }
    next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export { validateReading };

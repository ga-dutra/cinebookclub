import { validateReading } from "../middlewares/readings.middleware";
import { Router } from "express";
import {
  deleteReading,
  getUserReadings,
  postReading,
  updateGradeOrReviewOrDate,
} from "../controllers/readings.controller";
import { authenticateToken } from "../middlewares/authentication.middleware";

const readingRouter = Router();

readingRouter
  .all("/*", authenticateToken)
  .get("", getUserReadings)
  .post("", validateReading, postReading)
  .put("", updateGradeOrReviewOrDate)
  .delete("", deleteReading);

export { readingRouter };

import { validateWatching } from "../middlewares/watchings.middleware";
import { Router } from "express";
import { authenticateToken } from "../middlewares/authentication.middleware";
import {
  deleteWatching,
  getUserWatchings,
  postWatching,
  updateGradeOrReviewOrDate,
} from "../controllers/watchings.controller";

const watchingRouter = Router();

watchingRouter
  .all("/*", authenticateToken)
  .get("/:medias_id", getUserWatchings)
  .post("", validateWatching, postWatching)
  .put("", updateGradeOrReviewOrDate)
  .delete("", deleteWatching);

export { watchingRouter };

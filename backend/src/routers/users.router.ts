import { Router } from "express";
import { createUser, userLogin } from "../controllers/users.controller";
import {
  validateLogin,
  validateNewUser,
} from "../middlewares/users.middleware";

const usersRouter = Router();

usersRouter
  .post("/signup", validateNewUser, createUser)
  .post("/signin", validateLogin, userLogin);

export { usersRouter };

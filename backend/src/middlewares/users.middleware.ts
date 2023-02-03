import bcrypt from "bcrypt";
import { userSignUpSchema, userLoginSchema } from "../schemas/users.schema";
import userRepository from "../repositories/users.repository";
import { Request, Response, NextFunction } from "express";
import { User } from "../repositories/users.repository";

async function validateNewUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newUser: User = req.body;
  const newUserValidation = userSignUpSchema.validate(newUser, {
    abortEarly: false,
  });
  if (newUserValidation.error) {
    const errors = newUserValidation.error.details.map(
      (details) => details.message
    );
    return res.status(422).send(errors);
  }

  try {
    const existingUser = await userRepository.findByEmail(req.body.email);

    if (existingUser) {
      return res.status(409).send({ error: "User already exists!" });
    }
    next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  let passwordIsValid = undefined;
  const loginValidation = userLoginSchema.validate(req.body, {
    abortEarly: false,
  });

  if (loginValidation.error) {
    const errors = loginValidation.error.details.map(
      (details) => details.message
    );
    return res.status(422).send(errors);
  }

  try {
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      passwordIsValid = bcrypt.compareSync(password, existingUser.password);
    }
    if (existingUser && passwordIsValid) {
      res.locals.user_id = existingUser.id;
      next();
    } else {
      return res.status(401).send({ error: "E-mail or password are invalid" });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export { validateNewUser, validateLogin };

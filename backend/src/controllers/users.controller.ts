import { User } from "../repositories/users.repository";
import userService from "../services/users.service";
import { Request, Response } from "express";

export async function createUser(req: Request, res: Response) {
  const { email, password }: User = req.body;
  try {
    await userService.createUser({ email, password });
    return res.status(200).send({ message: "user created" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function userLogin(req: Request, res: Response) {
  const { email, password }: User = req.body;
  try {
    const token = await userService.createSession({ email, password });
    return res.status(200).send(token);
  } catch (error) {
    return res.status(401).send({ error: "E-mail or password are invalid" });
  }
}

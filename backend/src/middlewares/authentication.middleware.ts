import prisma from "../config/database";
import { NextFunction, Request, Response } from "express";

export async function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.header("Authorization");
  if (!authHeader)
    return res.status(401).send({
      name: "UnauthorizedError",
      message: "You must be signed in to continue",
    });

  const token = authHeader.split(" ")[1];
  if (!token)
    return res.status(401).send({
      name: "UnauthorizedError",
      message: "You must be signed in to continue",
    });

  try {
    const session = await prisma.sessions.findFirst({
      where: {
        token,
      },
    });
    if (!session) {
      return res.status(401).send({
        name: "UnauthorizedError",
        message: "You must be signed in to continue",
      });
    }
    req.userId = session.user_id;
    return next();
  } catch (error) {
    return res.status(401).send({
      name: "UnauthorizedError",
      message: "You must be signed in to continue",
    });
  }
}

export async function validateLocalStorageToken(req: Request, res: Response) {
  const authHeader = req.header("Authorization");

  if (!authHeader)
    return res.status(401).send({
      name: "UnauthorizedError",
      message: "You must be signed in to continue",
    });

  const token = authHeader.split(" ")[1];

  if (!token)
    return res.status(401).send({
      name: "UnauthorizedError",
      message: "You must be signed in to continue",
    });

  try {
    const session = await prisma.sessions.findFirst({
      where: {
        token,
      },
    });

    if (!session) {
      return res.status(401).send({
        name: "UnauthorizedError",
        message: "You must be signed in to continue",
      });
    }
    return res.sendStatus(200);
  } catch (error) {
    return res.status(401).send({
      name: "UnauthorizedError",
      message: "You must be signed in to continue",
    });
  }
}

// function generateUnauthorizedResponse(res: Response) {
//   res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
// }

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  userId: number;
};

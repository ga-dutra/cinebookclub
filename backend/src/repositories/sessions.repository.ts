import prisma from "../config/database";

async function createSession(data: Session) {
  return await prisma.sessions.create({
    data,
  });
}

async function findSessionByUserId(user_id: number) {
  return await prisma.sessions.findFirst({
    where: {
      user_id,
      active: true,
    },
  });
}

export type Session = {
  user_id: number;
  token: string;
};

const sessionsRepository = { createSession, findSessionByUserId };

export default sessionsRepository;

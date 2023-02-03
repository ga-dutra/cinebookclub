import prisma from "../config/database";

async function createUser(data: User) {
  return await prisma.users.create({
    data,
  });
}

async function findByEmail(email: string) {
  return await prisma.users.findUnique({
    where: {
      email,
    },
  });
}

export type User = {
  email: string;
  password: string;
  confirmed_password?: string;
};

const userRepository = { createUser, findByEmail };

export default userRepository;

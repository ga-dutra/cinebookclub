import userRepository, { User } from "../repositories/users.repository";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import sessionsRepository from "../repositories/sessions.repository";

async function createUser({ email, password }: User): Promise<User> {
  const passwordHash = bcrypt.hashSync(password, 12);
  try {
    return await userRepository.createUser({ email, password: passwordHash });
  } catch (error) {
    throw error();
  }
}

async function createSession({ email, password }: User) {
  const existingUser = await userRepository.findByEmail(email);
  if (!existingUser) throw Error();

  try {
    const existingSession = await sessionsRepository.findSessionByUserId(
      existingUser.id
    );
    if (existingSession) {
      return { token: existingSession.token };
    }

    const passwordIsValid = bcrypt.compareSync(password, existingUser.password);

    if (!passwordIsValid) throw Error();

    const token = uuid();
    await sessionsRepository.createSession({ user_id: existingUser.id, token });
    return { token: token };
  } catch (error) {
    throw error();
  }
}

const userService = { createUser, createSession };

export default userService;

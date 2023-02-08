"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_repository_1 = __importDefault(require("../repositories/users.repository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const sessions_repository_1 = __importDefault(require("../repositories/sessions.repository"));
async function createUser({ email, password }) {
    const passwordHash = bcrypt_1.default.hashSync(password, 12);
    try {
        return await users_repository_1.default.createUser({ email, password: passwordHash });
    }
    catch (error) {
        throw error();
    }
}
async function createSession({ email, password }) {
    const existingUser = await users_repository_1.default.findByEmail(email);
    if (!existingUser)
        throw Error();
    try {
        const existingSession = await sessions_repository_1.default.findSessionByUserId(existingUser.id);
        if (existingSession) {
            return { token: existingSession.token };
        }
        const passwordIsValid = bcrypt_1.default.compareSync(password, existingUser.password);
        if (!passwordIsValid)
            throw Error();
        const token = (0, uuid_1.v4)();
        await sessions_repository_1.default.createSession({ user_id: existingUser.id, token });
        return { token: token };
    }
    catch (error) {
        throw error();
    }
}
const userService = { createUser, createSession };
exports.default = userService;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.createUser = void 0;
const users_service_1 = __importDefault(require("../services/users.service"));
async function createUser(req, res) {
    const { email, password } = req.body;
    try {
        await users_service_1.default.createUser({ email, password });
        return res.status(200).send({ message: "user created" });
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}
exports.createUser = createUser;
async function userLogin(req, res) {
    const { email, password } = req.body;
    try {
        const token = await users_service_1.default.createSession({ email, password });
        return res.status(200).send(token);
    }
    catch (error) {
        return res.status(401).send({ error: "E-mail or password are invalid" });
    }
}
exports.userLogin = userLogin;

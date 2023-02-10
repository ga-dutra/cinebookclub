"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
async function createSession(data) {
    return await database_1.default.sessions.create({
        data,
    });
}
async function findSessionByUserId(user_id) {
    return await database_1.default.sessions.findFirst({
        where: {
            user_id,
            active: true,
        },
    });
}
const sessionsRepository = { createSession, findSessionByUserId };
exports.default = sessionsRepository;

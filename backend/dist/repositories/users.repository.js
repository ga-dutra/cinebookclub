"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
async function createUser(data) {
    return await database_1.default.users.create({
        data,
    });
}
async function findByEmail(email) {
    return await database_1.default.users.findUnique({
        where: {
            email,
        },
    });
}
const userRepository = { createUser, findByEmail };
exports.default = userRepository;

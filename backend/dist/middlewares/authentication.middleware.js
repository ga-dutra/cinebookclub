"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const database_1 = __importDefault(require("../config/database"));
async function authenticateToken(req, res, next) {
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
        const session = await database_1.default.sessions.findFirst({
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
    }
    catch (error) {
        return res.status(401).send({
            name: "UnauthorizedError",
            message: "You must be signed in to continue",
        });
    }
}
exports.authenticateToken = authenticateToken;

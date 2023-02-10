"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWatching = void 0;
const watchings_schema_1 = require("../schemas/watchings.schema");
const watchings_repository_1 = __importDefault(require("../repositories/watchings.repository"));
async function validateWatching(req, res, next) {
    const newWatching = req.body;
    const { userId } = req;
    const newWatchingValidation = watchings_schema_1.newWatchingSchema.validate(newWatching, {
        abortEarly: false,
    });
    if (newWatchingValidation.error) {
        const errors = newWatchingValidation.error.details.map((details) => details.message);
        return res.status(422).send(errors);
    }
    try {
        const existingUserWatching = await watchings_repository_1.default.findByMediaAndUserId(newWatching.api_id, userId, newWatching.medias_id);
        if (existingUserWatching) {
            return res.status(409).send({ error: "Watching already exists!" });
        }
        next();
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}
exports.validateWatching = validateWatching;

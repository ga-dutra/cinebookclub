"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReading = void 0;
const readings_schema_1 = require("../schemas/readings.schema");
const readings_repository_1 = __importDefault(require("../repositories/readings.repository"));
async function validateReading(req, res, next) {
    const newReading = req.body;
    const { userId } = req;
    const newReadingValidation = readings_schema_1.newReadingSchema.validate(newReading, {
        abortEarly: false,
    });
    if (newReadingValidation.error) {
        const errors = newReadingValidation.error.details.map((details) => details.message);
        return res.status(422).send(errors);
    }
    try {
        const existingUserReading = await readings_repository_1.default.findByBookAndUserId(newReading.book_api_id, userId);
        if (existingUserReading) {
            return res.status(409).send({ error: "Reading already exists!" });
        }
        next();
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}
exports.validateReading = validateReading;

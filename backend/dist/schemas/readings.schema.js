"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newReadingSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const newReadingSchema = joi_1.default.object({
    medias_id: joi_1.default.number(),
    user_id: joi_1.default.number(),
    grade: joi_1.default.number(),
    review: joi_1.default.string(),
    book_api_id: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
    author: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    img: joi_1.default.string().required(),
    page_count: joi_1.default.number().required(),
});
exports.newReadingSchema = newReadingSchema;

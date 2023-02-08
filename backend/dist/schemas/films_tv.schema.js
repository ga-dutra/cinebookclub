"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newFilm_TvSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const newFilm_TvSchema = joi_1.default.object({
    medias_id: joi_1.default.number().required(),
    user_id: joi_1.default.number(),
    grade: joi_1.default.number(),
    review: joi_1.default.string(),
    api_id: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
    overview: joi_1.default.string().required(),
    img: joi_1.default.string().required(),
    vote_average: joi_1.default.number().required(),
});
exports.newFilm_TvSchema = newFilm_TvSchema;

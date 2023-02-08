"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.userSignUpSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const userSignUpSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().empty(" ").required(),
    confirmed_password: joi_1.default.any().valid(joi_1.default.ref("password")).required(),
});
exports.userSignUpSchema = userSignUpSchema;
const userLoginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().empty(" ").required(),
});
exports.userLoginSchema = userLoginSchema;

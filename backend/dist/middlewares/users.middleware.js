"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateNewUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_schema_1 = require("../schemas/users.schema");
const users_repository_1 = __importDefault(require("../repositories/users.repository"));
async function validateNewUser(req, res, next) {
    const newUser = req.body;
    const newUserValidation = users_schema_1.userSignUpSchema.validate(newUser, {
        abortEarly: false,
    });
    if (newUserValidation.error) {
        const errors = newUserValidation.error.details.map((details) => details.message);
        return res.status(422).send(errors);
    }
    try {
        const existingUser = await users_repository_1.default.findByEmail(req.body.email);
        if (existingUser) {
            return res.status(409).send({ error: "User already exists!" });
        }
        next();
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}
exports.validateNewUser = validateNewUser;
async function validateLogin(req, res, next) {
    const { email, password } = req.body;
    let passwordIsValid = undefined;
    const loginValidation = users_schema_1.userLoginSchema.validate(req.body, {
        abortEarly: false,
    });
    if (loginValidation.error) {
        const errors = loginValidation.error.details.map((details) => details.message);
        return res.status(422).send(errors);
    }
    try {
        const existingUser = await users_repository_1.default.findByEmail(email);
        if (existingUser) {
            passwordIsValid = bcrypt_1.default.compareSync(password, existingUser.password);
        }
        if (existingUser && passwordIsValid) {
            res.locals.user_id = existingUser.id;
            next();
        }
        else {
            return res.status(401).send({ error: "E-mail or password are invalid" });
        }
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}
exports.validateLogin = validateLogin;

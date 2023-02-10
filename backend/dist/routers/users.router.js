"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const users_middleware_1 = require("../middlewares/users.middleware");
const usersRouter = (0, express_1.Router)();
exports.usersRouter = usersRouter;
usersRouter
    .post("/signup", users_middleware_1.validateNewUser, users_controller_1.createUser)
    .post("/signin", users_middleware_1.validateLogin, users_controller_1.userLogin)
    .get("/storagetoken", authentication_middleware_1.validateLocalStorageToken);

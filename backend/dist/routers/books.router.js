"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const books_middleware_1 = require("../middlewares/books.middleware");
const express_1 = require("express");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const books_controller_1 = require("../controllers/books.controller");
const booksRouter = (0, express_1.Router)();
exports.booksRouter = booksRouter;
booksRouter
    .all("/*", authentication_middleware_1.authenticateToken)
    .get("", books_controller_1.getUserBooksWishlist)
    .post("", books_middleware_1.validateBookWishlist, books_controller_1.postBookWishlist)
    .delete("", books_controller_1.deleteBookWishList);

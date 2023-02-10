"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filmsRouter = void 0;
const films_tv_middleware_1 = require("../middlewares/films_tv.middleware");
const express_1 = require("express");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const films_controller_1 = require("../controllers/films.controller");
const filmsRouter = (0, express_1.Router)();
exports.filmsRouter = filmsRouter;
filmsRouter
    .all("/*", authentication_middleware_1.authenticateToken)
    .get("", films_controller_1.getUserFilmsWishlist)
    .post("", films_tv_middleware_1.validateFilmAndTvWishlist, films_controller_1.postFilmWishlist)
    .delete("", films_controller_1.deleteFilmWishList);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tvShowsRouter = void 0;
const films_tv_middleware_1 = require("../middlewares/films_tv.middleware");
const express_1 = require("express");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const tv_shows_controller_1 = require("../controllers/tv_shows.controller");
const tvShowsRouter = (0, express_1.Router)();
exports.tvShowsRouter = tvShowsRouter;
tvShowsRouter
    .all("/*", authentication_middleware_1.authenticateToken)
    .get("", tv_shows_controller_1.getUserTvShowsWishlist)
    .post("", films_tv_middleware_1.validateFilmAndTvWishlist, tv_shows_controller_1.postTvShowWishlist)
    .delete("", tv_shows_controller_1.deleteTvShowWishList);

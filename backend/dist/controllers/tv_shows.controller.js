"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTvShowWishList = exports.postTvShowWishlist = exports.getUserTvShowsWishlist = void 0;
const http_status_1 = __importDefault(require("http-status"));
const tv_shows_service_1 = __importDefault(require("../services/tv_shows.service"));
async function getUserTvShowsWishlist(req, res) {
    const { userId } = req;
    try {
        const userTvShowsWishList = await tv_shows_service_1.default.getUserTvShowsWishlist(userId);
        return res.status(http_status_1.default.OK).send(userTvShowsWishList);
    }
    catch (error) {
        return res.sendStatus(http_status_1.default.NO_CONTENT);
    }
}
exports.getUserTvShowsWishlist = getUserTvShowsWishlist;
async function postTvShowWishlist(req, res) {
    const { userId } = req;
    const userTvShowWishList = {
        ...req.body,
        user_id: userId,
        medias_id: 3,
    };
    if (!userTvShowWishList) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
    try {
        const newTvShowWishList = await tv_shows_service_1.default.postTvShowWishList(userTvShowWishList);
        return res.status(http_status_1.default.CREATED).send(newTvShowWishList);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
}
exports.postTvShowWishlist = postTvShowWishlist;
async function deleteTvShowWishList(req, res) {
    const { userId } = req;
    const { api_id } = req.body;
    if (!api_id) {
        return res
            .status(http_status_1.default.BAD_REQUEST)
            .send({ error: "api_id is necessary" });
    }
    try {
        await tv_shows_service_1.default.deleteTvShowWishlist(api_id, userId);
        return res
            .status(http_status_1.default.OK)
            .send({ message: "tv show in wishlist deleted" });
    }
    catch (error) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
}
exports.deleteTvShowWishList = deleteTvShowWishList;

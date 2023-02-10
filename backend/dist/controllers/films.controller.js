"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFilmWishList = exports.postFilmWishlist = exports.getUserFilmsWishlist = void 0;
const http_status_1 = __importDefault(require("http-status"));
const films_service_1 = __importDefault(require("../services/films.service"));
async function getUserFilmsWishlist(req, res) {
    const { userId } = req;
    try {
        const userFilmsWishList = await films_service_1.default.getUserFilmsWishlist(userId);
        return res.status(http_status_1.default.OK).send(userFilmsWishList);
    }
    catch (error) {
        return res.sendStatus(http_status_1.default.NO_CONTENT);
    }
}
exports.getUserFilmsWishlist = getUserFilmsWishlist;
async function postFilmWishlist(req, res) {
    const { userId } = req;
    const userFilmWishList = {
        ...req.body,
        user_id: userId,
        medias_id: 2,
    };
    if (!userFilmWishList) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
    try {
        const newFilmWishList = await films_service_1.default.postFilmsWishList(userFilmWishList);
        return res.status(http_status_1.default.CREATED).send(newFilmWishList);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
}
exports.postFilmWishlist = postFilmWishlist;
async function deleteFilmWishList(req, res) {
    const { userId } = req;
    const { api_id } = req.body;
    if (!api_id) {
        return res
            .status(http_status_1.default.BAD_REQUEST)
            .send({ error: "api_id is necessary" });
    }
    try {
        await films_service_1.default.deleteFilmWishList(api_id, userId);
        return res
            .status(http_status_1.default.OK)
            .send({ message: "film in wishlist deleted" });
    }
    catch (error) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
}
exports.deleteFilmWishList = deleteFilmWishList;

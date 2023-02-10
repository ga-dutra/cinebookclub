"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookWishList = exports.postBookWishlist = exports.getUserBooksWishlist = void 0;
const http_status_1 = __importDefault(require("http-status"));
const books_service_1 = __importDefault(require("../services/books.service"));
async function getUserBooksWishlist(req, res) {
    const { userId } = req;
    try {
        const userBooksWishList = await books_service_1.default.getUserBooksWishlist(userId);
        return res.status(http_status_1.default.OK).send(userBooksWishList);
    }
    catch (error) {
        return res.sendStatus(http_status_1.default.NO_CONTENT);
    }
}
exports.getUserBooksWishlist = getUserBooksWishlist;
async function postBookWishlist(req, res) {
    const { userId } = req;
    const userBookWishList = {
        ...req.body,
        user_id: userId,
        medias_id: 1,
    };
    if (!userBookWishList) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
    try {
        const newBookWishList = await books_service_1.default.postBookWishList(userBookWishList);
        return res.status(http_status_1.default.CREATED).send(newBookWishList);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
}
exports.postBookWishlist = postBookWishlist;
async function deleteBookWishList(req, res) {
    const { userId } = req;
    const { book_api_id } = req.body;
    if (!book_api_id) {
        return res
            .status(http_status_1.default.BAD_REQUEST)
            .send({ error: "book_api_id is necessary" });
    }
    try {
        await books_service_1.default.deleteBookWishList(userId, book_api_id);
        return res
            .status(http_status_1.default.OK)
            .send({ message: "book in wishlist deleted" });
    }
    catch (error) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
}
exports.deleteBookWishList = deleteBookWishList;

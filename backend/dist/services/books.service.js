"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wishlists_repository_1 = __importDefault(require("../repositories/wishlists.repository"));
async function getUserBooksWishlist(user_id) {
    try {
        const userBooksWishList = await wishlists_repository_1.default.listUserBooksWishList(user_id);
        if (!userBooksWishList) {
            throw Error();
        }
        return userBooksWishList;
    }
    catch (error) {
        console.log(error);
        return;
    }
}
async function postBookWishList(data) {
    try {
        return await wishlists_repository_1.default.createBookWishlist(data);
    }
    catch (error) {
        console.log(error);
        return;
    }
}
async function deleteBookWishList(user_id, book_api_id) {
    try {
        const userBookWishList = await wishlists_repository_1.default.findByBookAndUserId(book_api_id, user_id);
        if (!userBookWishList) {
            throw Error();
        }
        return await wishlists_repository_1.default.deleteBookWishList(userBookWishList.id);
    }
    catch (error) {
        console.log(error);
        return;
    }
}
const booksService = {
    getUserBooksWishlist,
    postBookWishList,
    deleteBookWishList,
};
exports.default = booksService;

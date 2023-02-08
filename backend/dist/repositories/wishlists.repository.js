"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
async function listUserBooksWishList(user_id) {
    return await database_1.default.books_wishlist.findMany({
        where: {
            user_id,
        },
    });
}
async function findByBookAndUserId(book_api_id, user_id) {
    return await database_1.default.books_wishlist.findFirst({
        where: {
            AND: { user_id, book_api_id },
        },
    });
}
async function findByFilmAndUserId(api_id, user_id) {
    return await database_1.default.films_wishlist.findFirst({
        where: {
            AND: { user_id, api_id },
        },
    });
}
async function findByTvAndUserId(api_id, user_id) {
    return await database_1.default.tv_shows_wishlist.findFirst({
        where: {
            AND: { user_id, api_id },
        },
    });
}
async function createBookWishlist(data) {
    return await database_1.default.books_wishlist.create({
        data,
    });
}
async function createFilmWishlist(data) {
    return await database_1.default.films_wishlist.create({
        data,
    });
}
async function createTvShowWishlist(data) {
    return await database_1.default.tv_shows_wishlist.create({
        data,
    });
}
async function listUserFilmsWishList(user_id) {
    return await database_1.default.films_wishlist.findMany({
        where: {
            user_id,
        },
    });
}
async function listUserTvShowsWishList(user_id) {
    return await database_1.default.tv_shows_wishlist.findMany({
        where: {
            user_id,
        },
    });
}
async function deleteBookWishList(wishlist_id) {
    return await database_1.default.books_wishlist.delete({
        where: {
            id: wishlist_id,
        },
    });
}
async function deleteFilmWishList(wishlist_id) {
    return await database_1.default.films_wishlist.delete({
        where: {
            id: wishlist_id,
        },
    });
}
async function deleteTvShowWishList(wishlist_id) {
    return await database_1.default.tv_shows_wishlist.delete({
        where: {
            id: wishlist_id,
        },
    });
}
const wishlistsRepository = {
    listUserBooksWishList,
    findByBookAndUserId,
    findByFilmAndUserId,
    findByTvAndUserId,
    createBookWishlist,
    listUserFilmsWishList,
    listUserTvShowsWishList,
    createFilmWishlist,
    createTvShowWishlist,
    deleteBookWishList,
    deleteFilmWishList,
    deleteTvShowWishList,
};
exports.default = wishlistsRepository;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wishlists_repository_1 = __importDefault(require("../repositories/wishlists.repository"));
const axios_1 = __importDefault(require("axios"));
async function getUserFilmsWishlist(user_id) {
    try {
        const userFilmsWishList = await wishlists_repository_1.default.listUserFilmsWishList(user_id);
        if (!userFilmsWishList) {
            throw Error();
        }
        return userFilmsWishList;
    }
    catch (error) {
        console.log(error);
        return;
    }
}
async function postFilmsWishList(data) {
    const apiURI = `https://api.themoviedb.org/3/movie/${data.api_id}?api_key=${process.env.MOVIEDB_API_KEY}&language=pt-BR`;
    const filmDetails = await axios_1.default.get(apiURI);
    const fullFilm = {
        ...data,
        tagline: filmDetails.data.tagline,
        runtime: filmDetails.data.runtime,
    };
    try {
        return await wishlists_repository_1.default.createFilmWishlist(fullFilm);
    }
    catch (error) {
        console.log(error);
        return;
    }
}
async function deleteFilmWishList(api_id, user_id) {
    try {
        const userFilmWishList = await wishlists_repository_1.default.findByFilmAndUserId(api_id, user_id);
        if (!userFilmWishList) {
            throw Error();
        }
        return await wishlists_repository_1.default.deleteFilmWishList(userFilmWishList.id);
    }
    catch (error) {
        console.log(error);
        return;
    }
}
const filmsService = {
    getUserFilmsWishlist,
    postFilmsWishList,
    deleteFilmWishList,
};
exports.default = filmsService;

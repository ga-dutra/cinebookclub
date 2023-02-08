"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wishlists_repository_1 = __importDefault(require("../repositories/wishlists.repository"));
const axios_1 = __importDefault(require("axios"));
async function getUserTvShowsWishlist(user_id) {
    try {
        const userTvShowsWishList = await wishlists_repository_1.default.listUserTvShowsWishList(user_id);
        if (!userTvShowsWishList) {
            throw Error();
        }
        return userTvShowsWishList;
    }
    catch (error) {
        console.log(error);
        return;
    }
}
async function postTvShowWishList(data) {
    const apiURI = `https://api.themoviedb.org/3/tv/${data.api_id}?api_key=${process.env.MOVIEDB_API_KEY}&language=pt-BR`;
    const tvShowDetails = await axios_1.default.get(apiURI);
    const fullTvShow = {
        ...data,
        tagline: tvShowDetails.data.tagline,
        creator: tvShowDetails.data.created_by[0].name,
        seasons_number: tvShowDetails.data.number_of_seasons,
    };
    try {
        return await wishlists_repository_1.default.createTvShowWishlist(fullTvShow);
    }
    catch (error) {
        console.log(error);
        return;
    }
}
async function deleteTvShowWishlist(api_id, user_id) {
    try {
        const userTvShowWishList = await wishlists_repository_1.default.findByTvAndUserId(api_id, user_id);
        if (!userTvShowWishList) {
            throw Error();
        }
        return await wishlists_repository_1.default.deleteTvShowWishList(userTvShowWishList.id);
    }
    catch (error) {
        console.log(error);
        return;
    }
}
const tvShowService = {
    getUserTvShowsWishlist,
    postTvShowWishList,
    deleteTvShowWishlist,
};
exports.default = tvShowService;

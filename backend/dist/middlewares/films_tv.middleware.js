"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFilmAndTvWishlist = void 0;
const films_tv_schema_1 = require("../schemas/films_tv.schema");
const wishlists_repository_1 = __importDefault(require("../repositories/wishlists.repository"));
async function validateFilmAndTvWishlist(req, res, next) {
    const newFilmOrTvWishList = req.body;
    const { userId } = req;
    const newFilmOrTvWishListValidation = films_tv_schema_1.newFilm_TvSchema.validate(newFilmOrTvWishList, {
        abortEarly: false,
    });
    if (newFilmOrTvWishListValidation.error) {
        const errors = newFilmOrTvWishListValidation.error.details.map((details) => details.message);
        return res.status(422).send(errors);
    }
    try {
        const existingFilmWishList = await wishlists_repository_1.default.findByFilmAndUserId(newFilmOrTvWishList.api_id, userId);
        const existingTvWishList = await wishlists_repository_1.default.findByTvAndUserId(newFilmOrTvWishList.api_id, userId);
        if (existingFilmWishList || existingTvWishList) {
            return res
                .status(409)
                .send({ error: "Item already exists in wishlist!" });
        }
        next();
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}
exports.validateFilmAndTvWishlist = validateFilmAndTvWishlist;

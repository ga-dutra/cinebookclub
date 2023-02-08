"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBookWishlist = void 0;
const readings_schema_1 = require("../schemas/readings.schema");
const wishlists_repository_1 = __importDefault(require("../repositories/wishlists.repository"));
async function validateBookWishlist(req, res, next) {
    const newBookWishList = req.body;
    const { userId } = req;
    const newBookWishListValidation = readings_schema_1.newReadingSchema.validate(newBookWishList, {
        abortEarly: false,
    });
    if (newBookWishListValidation.error) {
        const errors = newBookWishListValidation.error.details.map((details) => details.message);
        return res.status(422).send(errors);
    }
    try {
        const existingBookWishList = await wishlists_repository_1.default.findByBookAndUserId(newBookWishList.book_api_id, userId);
        if (existingBookWishList) {
            return res
                .status(409)
                .send({ error: "Book already exists in wishlist!" });
        }
        next();
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}
exports.validateBookWishlist = validateBookWishlist;

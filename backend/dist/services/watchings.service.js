"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const watchings_repository_1 = __importDefault(require("../repositories/watchings.repository"));
async function getUserWatchings(user_id, medias_id) {
    try {
        const userWatchings = await watchings_repository_1.default.listUserWatchings(user_id, medias_id);
        if (!userWatchings) {
            throw Error();
        }
        return userWatchings;
    }
    catch (error) {
        throw error();
    }
}
async function postWatching(data) {
    try {
        return await watchings_repository_1.default.createWatching(data);
    }
    catch (error) {
        console.log(error);
        return;
    }
}
async function updateReview(newReview, user_id, api_id, medias_id) {
    try {
        const userWatching = await watchings_repository_1.default.findByMediaAndUserId(api_id, user_id, medias_id);
        return await watchings_repository_1.default.updateReview(userWatching.id, newReview);
    }
    catch (error) {
        throw error();
    }
}
async function updateGrade(newGrade, user_id, api_id, medias_id) {
    try {
        const userWatching = await watchings_repository_1.default.findByMediaAndUserId(api_id, user_id, medias_id);
        return await watchings_repository_1.default.updateGrade(userWatching.id, newGrade);
    }
    catch (error) {
        throw error();
    }
}
async function updateWatchingDate(newDate, user_id, api_id, medias_id) {
    try {
        const userWatching = await watchings_repository_1.default.findByMediaAndUserId(api_id, user_id, medias_id);
        return await watchings_repository_1.default.updateWatchingDate(userWatching.id, newDate);
    }
    catch (error) {
        throw error();
    }
}
async function deleteWatching(user_id, api_id, medias_id) {
    try {
        const userWatching = await watchings_repository_1.default.findByMediaAndUserId(api_id, user_id, medias_id);
        if (!userWatching) {
            throw Error();
        }
        return await watchings_repository_1.default.deleteWatching(userWatching.id);
    }
    catch (error) {
        throw error();
    }
}
const watchingService = {
    getUserWatchings,
    postWatching,
    updateReview,
    updateWatchingDate,
    updateGrade,
    deleteWatching,
};
exports.default = watchingService;

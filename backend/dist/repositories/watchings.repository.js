"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
async function createWatching(data) {
    return await database_1.default.watchings.create({
        data,
    });
}
async function listUserWatchings(user_id, medias_id) {
    return await database_1.default.watchings.findMany({
        where: {
            AND: { user_id, medias_id },
        },
        orderBy: {
            watched_at: "desc",
        },
    });
}
async function findByMediaAndUserId(api_id, user_id, medias_id) {
    return await database_1.default.watchings.findFirst({
        where: {
            AND: { user_id, medias_id, api_id },
        },
    });
}
async function updateGrade(watchingId, newGrade) {
    return await database_1.default.watchings.update({
        where: {
            id: watchingId,
        },
        data: {
            grade: newGrade,
        },
    });
}
async function updateReview(watchingId, newReview) {
    return await database_1.default.watchings.update({
        where: {
            id: watchingId,
        },
        data: {
            review: newReview,
        },
    });
}
async function updateWatchingDate(watchingId, newDate) {
    return await database_1.default.watchings.update({
        where: {
            id: watchingId,
        },
        data: {
            watched_at: newDate,
        },
    });
}
async function deleteWatching(watchingId) {
    return await database_1.default.watchings.delete({ where: { id: watchingId } });
}
const watchingsRepository = {
    createWatching,
    listUserWatchings,
    findByMediaAndUserId,
    updateGrade,
    updateReview,
    updateWatchingDate,
    deleteWatching,
};
exports.default = watchingsRepository;

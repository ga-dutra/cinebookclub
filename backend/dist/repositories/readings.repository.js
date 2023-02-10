"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
async function createReading(data) {
    return await database_1.default.readings.create({
        data,
    });
}
async function listUserReadings(user_id) {
    return await database_1.default.readings.findMany({
        where: {
            user_id,
        },
        orderBy: {
            read_at: "desc",
        },
    });
}
async function findByBookAndUserId(book_api_id, user_id) {
    return await database_1.default.readings.findFirst({
        where: {
            AND: { user_id, book_api_id },
        },
    });
}
async function updateGrade(readingId, newGrade) {
    return await database_1.default.readings.update({
        where: {
            id: readingId,
        },
        data: {
            grade: newGrade,
        },
    });
}
async function updateReview(readingId, newReview) {
    return await database_1.default.readings.update({
        where: {
            id: readingId,
        },
        data: {
            review: newReview,
        },
    });
}
async function updateReadingDate(readingId, newDate) {
    return await database_1.default.readings.update({
        where: {
            id: readingId,
        },
        data: {
            read_at: newDate,
        },
    });
}
async function deleteReading(readingId) {
    return await database_1.default.readings.delete({
        where: {
            id: readingId,
        },
    });
}
const readingRepository = {
    createReading,
    listUserReadings,
    findByBookAndUserId,
    updateGrade,
    updateReview,
    updateReadingDate,
    deleteReading,
};
exports.default = readingRepository;

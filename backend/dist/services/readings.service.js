"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readings_repository_1 = __importDefault(require("../repositories/readings.repository"));
async function getUserReadings(user_id) {
    try {
        const userReadings = await readings_repository_1.default.listUserReadings(user_id);
        if (!userReadings) {
            throw Error();
        }
        return userReadings;
    }
    catch (error) {
        throw error();
    }
}
async function postReading(data) {
    try {
        return await readings_repository_1.default.createReading(data);
    }
    catch (error) {
        console.log(error);
        return;
    }
}
async function updateReview(newReview, user_id, book_api_id) {
    try {
        const userReading = await readings_repository_1.default.findByBookAndUserId(book_api_id, user_id);
        return await readings_repository_1.default.updateReview(userReading.id, newReview);
    }
    catch (error) {
        throw error();
    }
}
async function updateGrade(newGrade, user_id, book_api_id) {
    try {
        const userReading = await readings_repository_1.default.findByBookAndUserId(book_api_id, user_id);
        return await readings_repository_1.default.updateGrade(userReading.id, newGrade);
    }
    catch (error) {
        throw error();
    }
}
async function updateReadingDate(newDate, user_id, book_api_id) {
    try {
        const userReading = await readings_repository_1.default.findByBookAndUserId(book_api_id, user_id);
        return await readings_repository_1.default.updateReadingDate(userReading.id, newDate);
    }
    catch (error) {
        throw error();
    }
}
async function deleteReading(user_id, book_api_id) {
    try {
        const userReading = await readings_repository_1.default.findByBookAndUserId(book_api_id, user_id);
        if (!userReading) {
            throw Error();
        }
        return await readings_repository_1.default.deleteReading(userReading.id);
    }
    catch (error) {
        throw error();
    }
}
const readingService = {
    getUserReadings,
    postReading,
    updateReview,
    updateGrade,
    updateReadingDate,
    deleteReading,
};
exports.default = readingService;

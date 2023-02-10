"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReading = exports.updateGradeOrReviewOrDate = exports.postReading = exports.getUserReadings = void 0;
const http_status_1 = __importDefault(require("http-status"));
const readings_service_1 = __importDefault(require("../services/readings.service"));
async function getUserReadings(req, res) {
    const { userId } = req;
    try {
        const userReading = await readings_service_1.default.getUserReadings(userId);
        return res.status(http_status_1.default.OK).send(userReading);
    }
    catch (error) {
        return res.sendStatus(http_status_1.default.NO_CONTENT);
    }
}
exports.getUserReadings = getUserReadings;
async function postReading(req, res) {
    const { userId } = req;
    const userReading = { ...req.body, user_id: userId, medias_id: 1 };
    if (!userReading) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
    try {
        const newUserReading = await readings_service_1.default.postReading(userReading);
        return res.status(http_status_1.default.CREATED).send(newUserReading);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
}
exports.postReading = postReading;
async function updateGradeOrReviewOrDate(req, res) {
    const { userId } = req;
    const { readingId } = req.params;
    const { book_api_id, newGrade, newReview, newReadingDate } = req.body;
    if (!newGrade && !newReview && !newReadingDate) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
    let gradeUpdated;
    let reviewUpdated;
    let dateUpdated;
    let adaptedNewDate;
    if (newReadingDate) {
        adaptedNewDate = adaptDate(newReadingDate);
    }
    try {
        gradeUpdated = await readings_service_1.default.updateGrade(newGrade, userId, book_api_id);
        reviewUpdated = await readings_service_1.default.updateReview(newReview, userId, book_api_id);
        dateUpdated = await readings_service_1.default.updateReadingDate(adaptedNewDate, userId, book_api_id);
        return res.status(200).send({ gradeUpdated, reviewUpdated, dateUpdated });
    }
    catch (error) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
}
exports.updateGradeOrReviewOrDate = updateGradeOrReviewOrDate;
async function deleteReading(req, res) {
    const { userId } = req;
    const { book_api_id } = req.body;
    if (!book_api_id) {
        return res
            .status(http_status_1.default.BAD_REQUEST)
            .send({ error: "book_api_id is necessary" });
    }
    try {
        await readings_service_1.default.deleteReading(userId, book_api_id);
        return res.status(http_status_1.default.OK).send({ message: "reading deleted" });
    }
    catch (error) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
}
exports.deleteReading = deleteReading;
function adaptDate(newReadingDate) {
    let splitArray;
    if (newReadingDate.includes(",")) {
        splitArray = newReadingDate.split(",");
    }
    else if (newReadingDate.includes("-")) {
        splitArray = newReadingDate.split("-");
    }
    return new Date(Number(splitArray[0]), Number(splitArray[1]) - 1, Number(splitArray[2]));
}

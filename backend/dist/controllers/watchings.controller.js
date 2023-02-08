"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWatching = exports.updateGradeOrReviewOrDate = exports.postWatching = exports.getUserWatchings = void 0;
const http_status_1 = __importDefault(require("http-status"));
const watchings_service_1 = __importDefault(require("../services/watchings.service"));
async function getUserWatchings(req, res) {
    const { userId } = req;
    const { medias_id } = req.params;
    if (!medias_id) {
        return res
            .status(http_status_1.default.BAD_REQUEST)
            .send({ error: "medias_id is necessary" });
    }
    else if (![2, 3].includes(Number(medias_id))) {
        return res
            .status(http_status_1.default.BAD_REQUEST)
            .send({ error: "medias_id must be 2 or 3" });
    }
    try {
        const userWatchings = await watchings_service_1.default.getUserWatchings(userId, Number(medias_id));
        return res.status(http_status_1.default.OK).send(userWatchings);
    }
    catch (error) {
        return res.sendStatus(http_status_1.default.NO_CONTENT);
    }
}
exports.getUserWatchings = getUserWatchings;
async function postWatching(req, res) {
    const { userId } = req;
    const userWatching = { ...req.body, user_id: userId };
    if (![2, 3].includes(userWatching.medias_id)) {
        return res
            .status(http_status_1.default.BAD_REQUEST)
            .send({ error: "medias_id must be 2 or 3" });
    }
    if (!userWatching) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
    try {
        const newUserWatching = await watchings_service_1.default.postWatching(userWatching);
        return res.status(http_status_1.default.CREATED).send(newUserWatching);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
}
exports.postWatching = postWatching;
async function updateGradeOrReviewOrDate(req, res) {
    const { userId } = req;
    const { watchingId } = req.params;
    const { medias_id, api_id, newGrade, newReview, newWatchingDate } = req.body;
    if (!medias_id) {
        return res
            .status(http_status_1.default.BAD_REQUEST)
            .send({ error: "medias_id is necessary" });
    }
    else if (![2, 3].includes(medias_id)) {
        return res
            .status(http_status_1.default.BAD_REQUEST)
            .send({ error: "medias_id must be 2 or 3" });
    }
    if (!newGrade && !newReview && !newWatchingDate) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
    let gradeUpdated;
    let reviewUpdated;
    let dateUpdated;
    let adaptedNewDate;
    if (newWatchingDate) {
        adaptedNewDate = adaptDate(newWatchingDate);
    }
    try {
        gradeUpdated = await watchings_service_1.default.updateGrade(newGrade, userId, api_id, medias_id);
        reviewUpdated = await watchings_service_1.default.updateReview(newReview, userId, api_id, medias_id);
        dateUpdated = await watchings_service_1.default.updateWatchingDate(adaptedNewDate, userId, api_id, medias_id);
        return res.status(200).send({ gradeUpdated, reviewUpdated, dateUpdated });
    }
    catch (error) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
}
exports.updateGradeOrReviewOrDate = updateGradeOrReviewOrDate;
async function deleteWatching(req, res) {
    const { userId } = req;
    const { medias_id, api_id } = req.body;
    if (!medias_id || !api_id) {
        return res
            .status(http_status_1.default.BAD_REQUEST)
            .send({ error: "medias_id and api_id are required" });
    }
    try {
        await watchings_service_1.default.deleteWatching(userId, api_id, medias_id);
        return res.status(http_status_1.default.OK).send({ message: "user watching deleted" });
    }
    catch (error) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
}
exports.deleteWatching = deleteWatching;
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

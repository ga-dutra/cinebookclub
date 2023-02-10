"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readingRouter = void 0;
const readings_middleware_1 = require("../middlewares/readings.middleware");
const express_1 = require("express");
const readings_controller_1 = require("../controllers/readings.controller");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const readingRouter = (0, express_1.Router)();
exports.readingRouter = readingRouter;
readingRouter
    .all("/*", authentication_middleware_1.authenticateToken)
    .get("", readings_controller_1.getUserReadings)
    .post("", readings_middleware_1.validateReading, readings_controller_1.postReading)
    .put("", readings_controller_1.updateGradeOrReviewOrDate)
    .delete("", readings_controller_1.deleteReading);

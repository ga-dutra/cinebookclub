"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchingRouter = void 0;
const watchings_middleware_1 = require("../middlewares/watchings.middleware");
const express_1 = require("express");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const watchings_controller_1 = require("../controllers/watchings.controller");
const watchingRouter = (0, express_1.Router)();
exports.watchingRouter = watchingRouter;
watchingRouter
    .all("/*", authentication_middleware_1.authenticateToken)
    .get("/:medias_id", watchings_controller_1.getUserWatchings)
    .post("", watchings_middleware_1.validateWatching, watchings_controller_1.postWatching)
    .put("", watchings_controller_1.updateGradeOrReviewOrDate)
    .delete("", watchings_controller_1.deleteWatching);

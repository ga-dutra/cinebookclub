"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routers_1 = require("./routers");
const server = (0, express_1.default)();
server
    .use(express_1.default.json())
    .use((0, cors_1.default)())
    .use("/users", routers_1.usersRouter)
    .use("/readings", routers_1.readingRouter)
    .use("/books", routers_1.booksRouter)
    .use("/watchings", routers_1.watchingRouter)
    .use("/films", routers_1.filmsRouter)
    .use("/tvshows", routers_1.tvShowsRouter);
server.get("/status", (req, res) => {
    res.send("server is on");
});
server.listen(4000, () => {
    console.log("Magic happens on port 4000");
});

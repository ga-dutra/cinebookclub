import express from "express";
import cors from "cors";
import {
  readingRouter,
  usersRouter,
  booksRouter,
  watchingRouter,
  filmsRouter,
  tvShowsRouter,
} from "./routers";

const server = express();

server
  .use(express.json())
  .use(cors())
  .use("/users", usersRouter)
  .use("/readings", readingRouter)
  .use("/books", booksRouter)
  .use("/watchings", watchingRouter)
  .use("/films", filmsRouter)
  .use("/tvshows", tvShowsRouter);

server.get("/status", (req, res) => {
  res.send("server is on");
});

server.listen(4000, () => {
  console.log("Magic happens on port 4000");
});

import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";

import indexRouter from "./src/router/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";

const server = express();
const port = 8080;
const ready = () => console.log("server ready on port" + port);
server.listen(port, ready);

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

// middlewares
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(morgan("dev"));

// endpoints
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);

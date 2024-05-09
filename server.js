<<<<<<< HEAD
import "dotenv/config.js";
=======
import "dotenv/config.js"
>>>>>>> 622b0f58e1998642b42a020b533d69ac6739c369
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";

import indexRouter from "./src/router/index.router.js";
import socketCb from "./src/router/index.socket.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
<<<<<<< HEAD
import dbConnect from "./src/utils/dbConnect.util.js";

// console.log(process.env);
// console.log(process.env.MONGO_URI);

// http server
const server = express();
const port = process.env.PORT || 8080;
const ready = async () => {
  console.log("server ready on port" + port);
  await dbConnect();
};

=======
import dbConnect from './src/utils/dbConnect.util.js';

// http server
const server = express();
const port = process.env.PORT || 9000;
const ready = async () => {
    console.log("server ready on port" + port);
    await dbConnect()
}
>>>>>>> 622b0f58e1998642b42a020b533d69ac6739c369
const nodeServer = createServer(server);
const socketServer = new Server(nodeServer);
nodeServer.listen(port, ready);

socketServer.on("connection", socketCb);

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

// middlewares
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(express.json());
server.use(morgan("dev"));

// endpoints
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);

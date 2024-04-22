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

// http server
const server = express();
const port = 8080;
const ready = () => console.log("server ready on port" + port);
const nodeServer = createServer(server);
nodeServer.listen(port, ready);

// tcp server
// creo un servidor de nodeServer, con el metodo nativo createServer, con las config del servidor de express
const socketServer = new Server(nodeServer);
// creo un servidor de TCP, construyendo una instancia del servidor de socketServer, pasando como base el servidor de node
socketServer.on("connection", socketCb);

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

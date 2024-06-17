import "dotenv/config.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
import ExpressHandlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
//import fileStore from "session-file-store";
import MongoStore from "connect-mongo";

import indexRouter from "./src/router/index.router.js";
import socketCb from "./src/router/index.socket.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import dbConnect from "./src/utils/dbConnect.util.js";

// console.log(process.env);
// console.log(process.env.MONGO_URI);

// http server
const server = express();
const port = 8080;
const ready = async () => {
  console.log("server ready on port" + port);
  await dbConnect();
};

const nodeServer = createServer(server);
const socketServer = new Server(nodeServer);
nodeServer.listen(port, ready);

//configuracion de helpers de Handlebars para los botones (range, ifEquals) de paginacion
const hbs = ExpressHandlebars.create({
  helpers: {
    range: function (start, end) {
      let range = [];
      for (let i = start; i <= end; i++) {
        range.push(i);
      }
      return range;
    },
    ifEquals: function (arg1, arg2, options) {
      return arg1 == arg2 ? options.fn(this) : options.inverse(this);
    },
  },
});

socketServer.on("connection", socketCb);

server.engine("handlebars", hbs.engine);
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

// middlewares
server.get(cookieParser(process.env.SECRET_COOKIE));
server.get(
  session({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(express.json());
server.use(morgan("dev"));
server.use(cookieParser(process.env.SECRET_COOKIE));
//const FileSession = fileStore(session);
server.use(
  session({
    //FILESTORE
    /*  store: new FileSession({
      path: "./src/data/fs/file/sessions",
      ttl: 60 * 60,
    }), */

    //MONGOSTORE
    store: new MongoStore({
      mongoUrl: process.env.MONGO_URI,
      ttl: 60 * 60,
    }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    //cookie: { maxAge: 60 * 60 * 1000 }
  })
);

// endpoints
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);

import environment from "./src/utils/env.util.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
//import morgan from "morgan";
import { engine } from "express-handlebars";
import ExpressHandlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import compression from "express-compression";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";

import winston from "./src/middlewares/winston.mid.js";
import indexRouter from "./src/router/index.router.js";
import socketCb from "./src/router/index.socket.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import configs from "./src/utils/swagger.util.js";
import __dirname from "./utils.js";

// http server
const server = express();
const port = environment.PORT;
const ready = async () => {
  console.log("server ready on port" + port);
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
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});

socketServer.on("connection", socketCb);

server.engine("handlebars", hbs.engine);
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

const specs = swaggerJSDoc(configs);

// middlewares
server.get(cookieParser(environment.SECRET_COOKIE));
server.get(
  session({
    secret: environment.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(express.json());
server.use(winston);
server.use(cookieParser(environment.SECRET_COOKIE));
server.use("/api/docs", serve, setup(specs));
server.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);
server.use(
  session({
    //MONGOSTORE
    secret: environment.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 10 * 60 * 1000 },
    store: new MongoStore({
      mongoUrl: environment.MONGO_URI,
      ttl: 60 * 60,
    }),
  })
);

//variables globales
server.use((req, res, next) => {
  res.locals.user_id = req.session.user_id || null; // Pasa el user_id si está en la sesión, de lo contrario null
  next();
});

// endpoints
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);

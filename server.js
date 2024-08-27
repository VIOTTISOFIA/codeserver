import environment from "./src/utils/env.util.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
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

// HTTP server
const server = express();
const port = environment.PORT;

// Create HTTP server
const nodeServer = createServer(server);
const socketServer = new Server(nodeServer);
nodeServer.listen(port, () => {
  console.log(`Server ready on port ${port}`);
});

const hbs = ExpressHandlebars.create({
  helpers: {
    range: (start, end) =>
      Array.from({ length: end - start + 1 }, (_, i) => i + start),
    ifEquals: (arg1, arg2, options) =>
      arg1 == arg2 ? options.fn(this) : options.inverse(this),
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

// Middleware configuration
server.use(cookieParser(environment.SECRET_COOKIE));
server.use(
  session({
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
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static(__dirname + "/public"));
server.use(compression({ brotli: { enabled: true, zlib: {} } }));
server.use(winston);
server.use("/api/docs", serve, setup(specs));

// Set global variables
server.use((req, res, next) => {
  res.locals.user_id = req.session.user_id || null; // Pass user_id if in session, otherwise null
  next();
});

// Routes
server.use("/", indexRouter);
server.use(pathHandler);
server.use(errorHandler);

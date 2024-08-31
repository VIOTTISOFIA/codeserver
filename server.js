import environment from "./src/utils/env.util.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
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

// HTTP server setup
const server = express();
const port = environment.PORT;

// Create HTTP server
const nodeServer = createServer(server);
const socketServer = new Server(nodeServer);

nodeServer.listen(port, () => {
  console.log("Server ready on port " + port);
});

socketServer.on("connection", socketCb);

// Handlebars setup with custom helpers
const hbs = engine({
  helpers: {
    range: (start, end) => {
      let range = [];
      for (let i = start; i <= end; i++) {
        range.push(i);
      }
      return range;
    },
    ifEquals: (arg1, arg2, options) => {
      return arg1 == arg2 ? options.fn(this) : options.inverse(this);
    },
  },
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});

server.engine("handlebars", hbs);
server.set("view engine", "handlebars");
server.set("views", `${__dirname}/src/views`);

// Swagger documentation setup
const specs = swaggerJSDoc(configs);

// Middleware setup
server.use(express.urlencoded({ extended: true }));
server.use(express.static(`${__dirname}/public`));
server.use(express.json());
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
server.use(winston);
server.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);
server.use("/api/docs", serve, setup(specs));

// Set global variables
server.use((req, res, next) => {
  res.locals.user_id = req.session.user_id || null;
  res.locals.userEmail = req.session.userEmail || ""; // Add global variable for user's email
  next();
});

// Main routes
server.use("/", indexRouter);

// Error and path handling
server.use(errorHandler);
server.use(pathHandler);

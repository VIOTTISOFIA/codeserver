/* import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.view.js";

const indexRouter = Router();

indexRouter.use("/api", apiRouter);
indexRouter.use("/", viewsRouter);
export default indexRouter; */

//-----------------------------------------------------------

import apiRouter from "./api/index.api.js";
import CustomRouter from "./customRouter.js";
import viewsRouter from "./views/index.view.js";

class IndexRouter extends CustomRouter {
  init() {
    this.use("/api", apiRouter);
    this.use("/", viewsRouter);
  }
}

const indexRouter = new IndexRouter();

export default indexRouter.getRouter();

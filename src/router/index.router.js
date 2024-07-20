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

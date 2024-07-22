// const indexRouter = Router();

// indexRouter.use("/api", apiRouter);
// indexRouter.use("/", viewsRouter);
// export default indexRouter;
import { fork } from "child_process";
import apiRouter from "./api/index.api.js";
import CustomRouter from "./CustomRouter.js";
import viewsRouter from "./views/index.view.js";

class IndexRouter extends CustomRouter {
  init() {
    this.use("/api", apiRouter);
    this.use("/", viewsRouter);
    this.read("/fork", ["PUBLIC"], (req, res, next) => {
      try {
        // recien aca nuestro servidor esta trabajando de forma asincrona
        const childProcess = fork("./src/processes/sum.proc.js");
        childProcess.send("start");
        childProcess.on("message", (result) => {});
        let result = 0;
        for (let i = 0; i < 5e9; i++) {
          result += 1;
        }
        return res.json({ result });
      } catch (error) {
        return next(error);
      }
    });
  }
}

const indexRouter = new IndexRouter();

export default indexRouter.getRouter();

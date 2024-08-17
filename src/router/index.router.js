import { fork } from "child_process";
import apiRouter from "./api/index.api.js";
import CustomRouter from "./customRouter.js";
import viewsRouter from "./views/index.view.js";
import sendEmail from "../utils/mailing.util.js";

class IndexRouter extends CustomRouter {
  init() {
    this.use("/api", apiRouter);
    this.use("/", viewsRouter);
    this.read("/fork", ["PUBLIC"], (req, res, next) => {
      try {
        const childProcess = fork("./src/processes/sum.proc.js");
        childProcess.send("start");
        childProcess.on("message", (result) => {
          return res.json({ result });
        });
      } catch (error) {
        return next(error);
      }
    });
    this.create("/api/nodemailer", ["PUBLIC"], async (req, res, next) => {
      try {
        const { email, name } = req.body;
        await sendEmail({to: email, name})
        return res.response200("EMAIL SENT!")
      } catch (error) {
       next (error) 
      }
    })
  }
}

const indexRouter = new IndexRouter();
export default indexRouter.getRouter();

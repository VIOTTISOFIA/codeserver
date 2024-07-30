import { Router } from "express";
import userManager from "../../data/mongo/managers/UserManager.mongo.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import CustomRouter from "../customRouter.js";
// import userManager from "../../data/fs/UserManager.fs.js";
import CustomRouter from "../customRouter.js";

class UsersRouter extends CustomRouter {
  init() {
    this.read("/register", ["PUBLIC"], async (req, res, next) => {
      try {
        return res.render("register", { title: "REGISTER" });
      } catch (error) {
        return next(error);
      }
    });
    this.read("/login", ["PUBLIC"], async (req, res, next) => {
      try {
        return res.render("login", { title: "LOGIN" });
      } catch (error) {
        return next(error);
      }
    });

    this.read(
      "/",
      ["USER", "ADMIN"],
      passportCb("jwt"),
      async (req, res, next) => {
        try {
          const { email } = req.user;
          const user = await userManager.readByEmail(email);
          console.log(user);
          return res.render("profile", { user });
        } catch (error) {
          return next(error);
        }
      }
    );
  }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();

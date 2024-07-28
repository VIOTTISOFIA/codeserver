import userManager from "../../data/mongo/managers/UserManager.mongo.js";
import passport from "../../middlewares/passport.mid.js";
import isAuth from "../../middlewares/isAuth.mid.js";
import passportCb from "../../middlewares/passportCb.js";
import CustomRouter from "../customRouter.js";
import {
  register,
  login,
  signout,
  google,
  profile,
} from "../../controllers/sessions.controller.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.create(
      "/register",
      ["PUBLIC"],
      passportCb("register"),
      async (req, res, next) => {
        try {
          return res.response201("Registered!");
        } catch (error) {
          return next(error);
        }
      }
    );

    this.create("/login", ["PUBLIC"], passportCb("login"), login);

    this.read("/online", ["USER", "ADMIN"], passportCb("jwt"), profile);

    this.create("/signout", ["USER", "ADMIN"], signout);

    this.read(
      "/google",
      ["PUBLIC"],
      passport.authenticate("google", { scope: ["email", "profile"] })
    );
    this.read(
      "/google/callback",
      ["PUBLIC"],
      passport.authenticate("google", { failureRedirect: "/login" }),
      function (req, res, next) {
        try {
          // Autenticación exitosa, redirigir a home
          res.redirect("/login");
        } catch (error) {
          return next(error);
        }
      }
    );
  }
}

const sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();

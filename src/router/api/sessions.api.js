import userManager from "../../data/mongo/managers/UserManager.mongo.js";
import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import isAuth from "../../middlewares/isAuth.mid.js";
import validator from "../../middlewares/joi.mid.js";
import usersSchema from "../../schemas/user.schema.js";
import CustomRouter from "../customRouter.js";
import { verifyCode } from "../../controllers/users.controller.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.create(
      "/register",
      ["PUBLIC"],
      validator(usersSchema),
      passportCb("register"),
      async (req, res, next) => {
        try {
          return res.response201("Registered!");
        } catch (error) {
          return next(error);
        }
      }
    );

    this.create(
      "/login",
      ["PUBLIC"],
      passportCb("login"),
      async (req, res, next) => {
        try {
          const { email } = req.body;
          const one = await userManager.readByEmail(email);
          return res
            .cookie("token", req.user.token, { signedCookie: true })
            .response200("Logged in! " + one.email);
        } catch (error) {
          return next(error);
        }
      }
    );

    this.read(
      "/online",
      ["USER", "ADMIN"],
      passportCb("jwt"),
      async (req, res, next) => {
        try {
          if (req.user.online) {
            return res.response200("Is online", req.user);
          }
          return res.error401();
        } catch (error) {
          return next(error);
        }
      }
    );

    this.create("/signout", ["USER", "ADMIN"], isAuth, (req, res, next) => {
      try {
        if (req.user.email) {
          res.clearCookie("token");
          return res.response200("Signed out!");
        }
        return res.error401();
      } catch (error) {
        return next(error);
      }
    });

    this.read(
      "/google",
      ["PUBLIC"],
      passport.authenticate("google", { scope: ["email", "profile"] })
    );
    this.read(
      "/google/callback",
      passport.authenticate("google", { session: false }),
      (req, res, next) => {
        try {
          return res.json({
            statusCode: 200,
            message: "Logged in with google!",
          });
        } catch (error) {
          return next(error);
        }
      }
    );
    this.create("/verify", ["PUBLIC"], verifyCode);
  }
}

const sessionRouter = new SessionsRouter();
export default sessionRouter.getRouter();

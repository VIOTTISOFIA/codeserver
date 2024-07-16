import { Router } from "express";
import userManager from "../../data/mongo/managers/UserManager.mongo.js";
import session from "express-session";
import passport from "../../middlewares/passport.mid.js";
import isAuth from "../../middlewares/isAuth.mid.js";
import passportCb from "../../middlewares/passportCb.js";
import CustomRouter from "../customRouter.js";

class SeSSionRouter extends CustomRouter {
  init() {
    this.create(
      "/register",
      ["PUBLIC"],
      passportCb("register"),
      async (req, res, next) => {
        try {
          return res.json({ statusCode: 201, message: "Registered!" });
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
            .json({
              statusCode: 200,
              message: "Logged in!",
              // token: req.user.token,
            });
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
          // if (req.session.online) {
          if (req.user.online) {
            return res.json({
              statusCode: 200,
              message: "Is online",
              user_id: req.user.user_id,
              email: req.user.email,
            });
          }
          return res.json({
            statusCode: 401,
            message: "Bad auth!",
          });
        } catch (error) {
          return next(error);
        }
      }
    );

    this.create("/signout", ["USER", "ADMIN"], (req, res, next) => {
      try {
        if (req.user.email) {
          //  return res
          //   .clearCookie("token");
          //console.log("Session destroyed");
          //   .json({
          //     statusCode: 200,
          //     message: "Signed out!",
          //   });
          return res.clearCookie("token").message200("Signed out!");
        }
        return res.json({
          statusCode: 401,
          message: "No active session to signout!",
        });
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
  }
}

const sessionRouter = new SeSSionRouter();
export default sessionRouter.getRouter;

import { Router } from "express";
import userManager from "../../data/mongo/managers/UserManager.mongo.js";
import session from "express-session";
import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import isAuth from "../../middlewares/isAuth.mid.js";
const sessionRouter = Router();

sessionRouter.post(
  "/register",
  //passport.authenticate("register", { session: false }),
  passportCb("register"),
  async (req, res, next) => {
    try {
      return res.json({ statusCode: 201, message: "Registered!" });
    } catch (error) {
      return next(error);
    }
  }
);

sessionRouter.post(
  "/login",
  //passport.authenticate("login", { session: false }),
  passportCb("login"),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const one = await userManager.readByEmail(email);
      return res.cookie("token", req.user.token, { signedCookie: true }).json({
        statusCode: 200,
        message: "Logged in!",
        //token: req.user.token,
      });
    } catch (error) {
      return next(error);
    }
  }
);

sessionRouter.get(
  "/online",
  /* passport.authenticate("jwt", { session: false }) */
  passportCb("jwt"),
  async (req, res, next) => {
    try {
      //if (req.session.online) {
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

sessionRouter.post("/signout", isAuth, (req, res, next) => {
  try {
    if (req.user.email) {
      //console.log("Signout session before destroy: ", req.session)

      res.clearCookie("token");
      return res.json({
        statusCode: 200,
        message: "Signed out!",
      });
    }

    return res.json({
      statusCode: 401,
      message: "No active session to signout!",
    });
  } catch (error) {
    return next(error);
  }
});

sessionRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
sessionRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res, next) => {
    try {
      return res.json({ statusCode: 200, message: "Logged in with google!" });
    } catch (error) {
      return next(error);
    }
  }
);
export default sessionRouter;

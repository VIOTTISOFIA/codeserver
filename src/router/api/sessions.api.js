import { Router } from "express";
import userManager from "../../data/mongo/managers/UserManager.mongo.js";
import session from "express-session";
import passport from "../../middlewares/passport.mid.js";
const sessionRouter = Router();

sessionRouter.post(
  "/register",
  passport.authenticate("register", { session: false }),
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
  passport.authenticate("login", { session: false }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Logged in!",
        token: req.user.token,
      });
    } catch (error) {
      return next(error);
    }
  }
);

sessionRouter.get("/online", async (req, res, next) => {
  try {
    if (req.session.online) {
      return res.json({
        statusCode: 200,
        message: "Is online",
        user_id: req.session.user_id,
        email: req.session.email,
      });
    }
    return res.json({
      statusCode: 401,
      message: "Bad auth!",
    });
  } catch (error) {
    return next(error);
  }
});

sessionRouter.post("/signout", (req, res, next) => {
  try {
    if (req.session.email) {
      req.session.destroy();
      res.clearCookie("connect.sid");
      //console.log("Session destroyed");
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

//Por lo general todos los metodos de 'sessions' son de tipo post

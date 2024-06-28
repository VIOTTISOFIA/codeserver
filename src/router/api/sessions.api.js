import { Router } from "express";
import userManager from "../../data/mongo/managers/UserManager.mongo.js";
import session from "express-session";
import isValidEmail from "../../middlewares/isValidEmail.mid.js";
import isValidData from "../../middlewares/isValidData.mid.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import isValidPassword from "../../middlewares/isValidPassword.mid.js";
import createHashPassword from "../../middlewares/createHashPassword.mid.js";
import passport from "../../middlewares/passport.mid.js";
import isAuth from "../../middlewares/isAuth.mid.js";

const sessionRouter = Router();

sessionRouter.post(
  "/register",
  /* isValidData,
  isValidEmail,
  createHashPassword, */
  passport.authenticate("register", { session: false }),
  async (req, res, next) => {
    try {
      const data = req.body;
      await userManager.create(data);
      return res.json({ statusCode: 201, message: "Registered!" });
    } catch (error) {
      return next(error);
    }
  }
);

sessionRouter.post(
  "/login",
  /* isValidUser,
  isValidPassword, */
  passport.authenticate("login", { session: false }),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const one = await userManager.readByEmail(email);
      /*  req.session.email = email;
      req.session.online = true;
      req.session.role = one.role;
      req.session.photo = one.photo;
      req.session.user_id = one._id;
      req.session.photo = one.photo;
      console.log("login session: ", req.session); */
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

sessionRouter.get("/online", isAuth, async (req, res, next) => {
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
});

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

export default sessionRouter;

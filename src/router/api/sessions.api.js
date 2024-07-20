import userManager from "../../data/mongo/managers/UserManager.mongo.js";
import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import isAuth from "../../middlewares/isAuth.mid.js";
import CustomRouter from "../customRouter.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.create(
      "/register",
      ["PUBLIC"],
      passportCb("register"),
      async (req, res, next) => {
        try {
          //return res.json({ statusCode: 201, message: "Registered!" });
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
          //.json({ statusCode: 200, message: "Logged in!"});
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
          //if (req.session.online) {
          if (req.user.online) {
            /*  return res.json({
              statusCode: 200,
              message: "Is online",
              user_id: req.user.user_id,
              email: req.user.email,
            }); */
            return res.response200("Is online");
          }
          /*  return res.json({
            statusCode: 401,
            message: "Bad auth!",
          }); */
          return res.error401();
        } catch (error) {
          return next(error);
        }
      }
    );

    this.create("/signout", ["USER", "ADMIN"], isAuth, (req, res, next) => {
      try {
        if (req.user.email){
          res.clearCookie("token");
          /* return res.json({
            statusCode: 200,
            message: "Signed out!",
          }); */
          return res.response200("Signed out!");
        }
        //return res.json({ statusCode: 401, message: "No active session to signout!" });
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
      ["PUBLIC"],
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

const sessionRouter = new SessionsRouter();

export default sessionRouter.getRouter();

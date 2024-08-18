import CustomRouter from "../customRouter.js";
import passport from "../../middlewares/passport.js";
import { register, login } from "../../controllers/sessions.controller.js";

class SessionRouter extends CustomRouter {
  init() {
    this.create(
      "/register",
      ["PUBLIC"],
      passport.authenticate("register", register),
      register
    );

    this.create(
      "/login",
      ["PUBLIC"],
      passport.authenticate("login", login),
      login
    );

    // this.read("/", ["USER"], auth);

    // this.create("/logout", ["USER"], logout);
  }
}

const sessionRouter = new SessionRouter();

export default sessionRouter.getRouter();

import { Router } from "express";
import userManager from "../../data/mongo/managers/UserManager.mongo.js";
// import userManager from "../../data/fs/UserManager.fs.js";

const usersRouter = Router();

usersRouter.get("/register", async (req, res, next) => {
  try {
    return res.render("register", { title: "REGISTER" });
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/login", async (req, res, next) => {
  try {
    return res.render("login", { title: "LOGIN" });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const { email } = req.session;
    const user = await userManager.readByEmail(email);
    console.log(user);
    return res.render("profile", { user });
  } catch (error) {
    return next(error);
  }
});
export default usersRouter;

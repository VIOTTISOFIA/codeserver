import { Router } from "express";
import userManager from "../../data/fs/UserManager.fs.js";

const usersRouter = Router();

usersRouter.get("/register", async (req, res, next) => {
  try {
    return res.render("register", { title: "REGISTER" });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    return res.render("login", { title: "LOGIN" });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
   const users = await userManager.read();
    return res.render("profile", { users });
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;

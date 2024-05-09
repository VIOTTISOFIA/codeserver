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
<<<<<<< HEAD
usersRouter.get("/login", async (req, res, next) => {
  try {
    return res.render("login", { title: "LOGIN" });
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/profile", async (req, res, next) => {
  try {
    const users = await userManager.read();
    return res.render("profile", { users });
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await userManager.readOne(uid);
    return res.render("profile", { user: one });
=======

usersRouter.get("/login", async (req, res, next) => {
  try {
    return res.render("login", { title: "LOGIN" });
>>>>>>> 622b0f58e1998642b42a020b533d69ac6739c369
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/profile", async (req, res, next) => {
  try {
   const users = await userManager.read();
    return res.render("profile", { users });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get ("/:uid", async (req, res, next) => {
  try {
      const { uid } = req.params
      const one = await userManager.readOne(uid)
      return res.render ("profile", { user:one })
  } catch (error) {
      return next(error)
  }
})

export default usersRouter;

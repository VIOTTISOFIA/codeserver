import { Router } from "express";
import userManager from "../../data/mongo/managers/UserManager.mongo.js";
<<<<<<< HEAD
// import userManager from "../../data/fs/UserManager.fs.js";
import passportCb from "../../middlewares/passportCb.js";
=======
import passportCb from "../../middlewares/passportCb.mid.js";
// import userManager from "../../data/fs/UserManager.fs.js";
>>>>>>> 1426f7f4e4ffd999aa3faa62f700b16383b255e5

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

usersRouter.get("/", passportCb("jwt"), async (req, res, next) => {
  try {
    const { email } = req.user;
    const user = await userManager.readByEmail(email);
    console.log(user);
    return res.render("profile", { user });
  } catch (error) {
    return next(error);
  }
});
export default usersRouter;

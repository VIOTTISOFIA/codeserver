import { Router } from "express";
import userManager from "../../data/mongo/managers/UserManager.mongo.js";
import session from "express-session";
import isValidEmail from "../../middlewares/isValidEmail.mid.js";
import isValidData from "../../middlewares/isValidData.mid.js";

const sessionRouter = Router();

sessionRouter.post("/register", isValidData, isValidEmail, async (req, res, next) => {
  try {
    const data = req.body
    await userManager.create(data);
    return res.json({ statusCode: 201, message: "Registered!" });
  } catch (error) {
    return next (error)
  }
})

sessionRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const one = await userManager.readByEmail(email);

    if (one.password === password) {
      req.session.email = email;
      req.session.online = true;
      req.session.role = one.role;
      req.session.user_id = one._id;
      req.session.photo = one.photo;
      console.log("login session: ", req.session);
      return res.json({ statusCode: 200, message: "Logged in!" });
    }
    return res.json({
      statusCode: 401,
      message: "Bad auth!",
    });
  } catch (error) {
    return next(error);
  }
});

sessionRouter.get("/online", (req, res, next) => {
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
    //console.log("Signout session before destroy: ", req.session)

    req.session.destroy();
    //console.log("Session destroyed");
    res.clearCookie('connect.sid');
    return res.json({
      statusCode: 200,
      message: "Signed out!",
    });
  } catch (error) {
    return next(error);
  }
});


export default sessionRouter;

//Por lo general todos los metodos de 'sessions' son de tipo post

//volver a ver clase cookies 1 y revisar la respuesta de res.cookie

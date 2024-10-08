import { Router } from "express";

const cookiesRouter = Router();

cookiesRouter.get("/set", (req, res, next) => {
  try {
    return res
      .cookie("modo", "nocturno", { maxAge: 100000 })
      .cookie("otra", "cookie nueva", { maxAge: 60000 })
      .cookie("onLine", true, { maxAge: 60 * 60 * 1000 })
      .json({ message: "la cookie vence en 10seg" });
  } catch (error) {
    return next(error);
  }
});

cookiesRouter.get("/", (req, res, next) => {
  try {
    const cookies = req.cookies;
    const online = req.cookies.online;
    return res.json({ cookies, online });
  } catch (error) {
    return next(error);
  }
});
cookiesRouter.get("/destroy/:cookie", (req, res, next) => {
  try {
    const { cookie } = req.params;
    return res
      .clearCookie(cookie)
      .json({ message: "cookie" + cookie + " eliminada" });
  } catch (error) {
    return next(error);
  }
});

cookiesRouter.get("/signed", (req, res, next) => {
  try {
    return res
      .cookie("role", "admin", { signed: true })
      .json({ message: "cookie firmada con el rol del usuario" });
  } catch (error) {
    return next(error);
  }
});

cookiesRouter.get("/get-signed", (req, res, next) => {
  try {
    //const role = req.signedCookies.role;
    return res.json({ message: req.signedCookies });
  } catch (error) {
    return next(error);
  }
});
export default cookiesRouter;

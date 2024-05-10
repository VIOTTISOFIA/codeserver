import { Router } from "express";
import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js";
import userManager from "../../data/fs/UserManager.fs.js";
import productManager from "../../data/fs/ProductManager.fs.js";

const viewsRouter = Router();

viewsRouter.use("/products", productsRouter);
viewsRouter.use("/users", usersRouter);
viewsRouter.get("/", async (req, res, next) => {
  try {
    const products = await productManager.read();
  return res.render("index", { title: "HOME", products } );
  } catch (error) {
    return next(error);
  }
});

viewsRouter.get("/", (req, res, next) => {
  try {
  return res.render("products", { title: "PRODUCTS" } );
  } catch (error) {
    return next(error);
  }
});

viewsRouter.get("/login", (req, res, next) => {
  try {
  return res.render("login", { title: "LOGIN" } );
  } catch (error) {
    return next(error);
  }
});

viewsRouter.get("/register", (req, res, next) => {
  try {
  return res.render("register", { title: "REGISTER" } );
  } catch (error) {
    return next(error);
  }
});

viewsRouter.get("/profile", async (req, res, next) => {
  try {
    const users = await userManager.read();
  return res.render("profile", { title: "PROFILE", users } );
  } catch (error) {
    return next(error);
  }
});


export default viewsRouter;
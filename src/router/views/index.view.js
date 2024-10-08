//import { Router } from "express";
import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js";
import cartsRouter from "./carts.view.js";
import productManager from "../../data/mongo/managers/ProductsManager.mongo.js";
import CustomRouter from "../customRouter.js";

class ViewsRouter extends CustomRouter {
  init() {
    this.use("/carts", cartsRouter);
    this.use("/products", productsRouter);
    this.use("/users", usersRouter);
    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const products = await productManager.read();
        return res.render("index", { title: "HOME", products });
      } catch (error) {
        return next(error);
      }
    });
    this.read("/", ["PUBLIC"], (req, res, next) => {
      try {
        return res.render("products", { title: "PRODUCTS" });
      } catch (error) {
        return next(error);
      }
    });

    this.read("/login", ["PUBLIC"], (req, res, next) => {
      try {
        return res.render("login", { title: "LOGIN" });
      } catch (error) {
        return next(error);
      }
    });

    this.read("/register", ["PUBLIC"], (req, res, next) => {
      try {
        return res.render("register", { title: "REGISTER" });
      } catch (error) {
        return next(error);
      }
    });
    this.read("/profile", ["USER", "ADMIN"], async (req, res, next) => {
      try {
        const users = await userManager.read();
        return res.render("profile", { title: "PROFILE", users });
      } catch (error) {
        return next(error);
      }
    });
    this.read("/verified", ["PUBLIC"], async (req, res, next) => {
      try {
        return res.render("verified", { title: "VERIFY" });
      } catch (error) {
        return next(error);
      }
    });

    this.read("/thankyou", ["USER", "ADMIN"], (req, res, next) => {
      try {
        const { email } = req.body;
        return res.render("success", { userEmail: email });
      } catch (error) {
        return next(error);
      }
    });
  }
}

const viewsRouter = new ViewsRouter();
export default viewsRouter.getRouter();

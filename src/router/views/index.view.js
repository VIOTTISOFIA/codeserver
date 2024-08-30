import CustomRouter from "../customRouter.js"; // Asegúrate de que esta ruta sea correcta
import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js";
import cartsRouter from "./carts.view.js";
import productManager from "../../data/mongo/managers/ProductsManager.mongo.js";
import userManager from "../../data/mongo/managers/UserManager.mongo.js";

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

    this.read("/products", ["PUBLIC"], (req, res, next) => {
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
        if (req.user && req.user.email) {
          return res.render("success", { userEmail: req.user.email });
        } else {
          return res.status(404).send({
            statusCode: 404,
            message: "GET /thankyou not found path",
          });
        }
      } catch (error) {
        return next(error);
      }
    });
  }
}

const viewsRouter = new ViewsRouter();
export default viewsRouter.getRouter();

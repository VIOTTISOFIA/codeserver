//import { Router } from "express";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";
import productsManager from "../../data/mongo/managers/ProductsManager.mongo.js";
import usersManager from "../../data/mongo/managers/UserManager.mongo.js";
import isAuth from "../../middlewares/isAuth.mid.js";
import CustomRouter from "../customRouter.js";

class CartsRouter extends CustomRouter {
  init() {
    // Ruta para obtener un carrito específico por ID del carrito
    this.read("/cart/:cid", ["ADMIN"], async (req, res, next) => {
      try {
        const { cid } = req.params;
        const cart = await cartsManager.readOne({ _id: cid });
        const products = await productsManager.read();
        return res.render("carts", { title: "Cart", cart, products });
      } catch (error) {
        return next(error);
      }
    });

    //Ruta para obtener el carrito de un usuario loggeado
    this.read("/", ["USER", "ADMIN"], isAuth, async (req, res, next) => {
      try {
        console.log("Session:", req.user);

        // Obtener user_id desde la sesión
        const user_id = req.user._id;
        console.log("user_id:", user_id);

        if (!user_id) {
          const error = new Error("User ID is required");
          error.statusCode = 400;
          console.error(error);
          throw error;
        }

        //leo todos los usuarios
        const users = await usersManager.read();

        //leo todos los carritos del usuario
        const carts = await cartsManager.read({ user_id });

        const cartDetails = carts.map((cart) => {
          // Verifica si cart.user_id está definido y si cart.user_id._id está definido
          if (cart.user_id && cart.user_id._id) {
            // Encuentra el usuario correspondiente en la lista de usuarios
            const user = users.find(
              (user) => user._id.toString() === cart.user_id._id.toString()
            );

            if (user) {
              return {
                ...cart,
                user_id: user,
              };
            }
          }
          return cart;
        });
        return res.render("carts", { title: "Carts user", carts: cartDetails });
      } catch (error) {
        console.error("Error occurred:", error);
        return next(error);
      }
    });
  }
}

const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();

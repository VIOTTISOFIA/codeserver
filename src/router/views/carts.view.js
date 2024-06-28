import { Router } from "express";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";
import productsManager from "../../data/mongo/managers/ProductsManager.mongo.js";
import usersManager from "../../data/mongo/managers/UserManager.mongo.js";
import isAuth from "../../middlewares/isAuth.mid.js";

const cartsRouter = Router();

// Ruta para obtener un carrito específico por ID del carrito
cartsRouter.get("/cart/:cid", async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await cartsManager.readOne({ _id: cid });
    const products = await productsManager.read();
    return res.render("carts", { title: "Cart", cart, products });
  } catch (error) {
    return next(error);
  }
});

cartsRouter.get("/", isAuth, async (req, res, next) => {
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

      // Si no se puede encontrar el usuario o las propiedades están indefinidas, devuelve el carrito sin cambios
      return cart;
    });

    // Renderiza la vista
    return res.render("carts", { title: "Carts user", carts: cartDetails });
  } catch (error) {
    console.error("Error occurred:", error);
    return next(error);
  }
});

export default cartsRouter;

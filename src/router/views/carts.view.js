import { Router } from "express";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";
import productsManager from "../../data/mongo/managers/ProductsManager.mongo.js";

const cartsRouter = Router();

cartsRouter.get("/:cid", async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await cartsManager.readOne(cid);
    const products = await productsManager.read();
    return res.render("carts", { cart, products });
  } catch (error) {
    return next(error);
  }
});

cartsRouter.get("/:user_id", async (req, res, next) => {
  try {
    const { user_id } = req.params; // Obtén el ID del usuario de los parámetros de la URL
    const cart = await cartsManager.readOne({user_id}); // Busca el carrito específico por el ID del usuario

    // Renderiza la vista "carts" pasando el carrito
    return res.render("carts", { title: "CART", cart });
  } catch (error) {
    return next(error);
  }
});

export default cartsRouter;

//ACA TENGO QUE CREAR UNA RUTA HACIA LA VISTA DE UN CARRITO Y 
//AGREGAR FUNCIONALIDAD AL BOTON DE ADD TO LIST DESDE LA VISTA DE DETAILS


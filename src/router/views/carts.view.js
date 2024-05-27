import { Router } from "express";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";
import productsManager from "../../data/mongo/managers/ProductsManager.mongo.js";

const cartsRouter = Router();

cartsRouter.get("/:cid", async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await cartsManager.getCartById(cid);
    const products = await productsManager.getProducts();
    return res.render("carts", { cart, products });
  } catch (error) {
    return next(error);
  }
});

export default cartsRouter;

//ACA TENGO QUE CREAR UNA RUTA HACIA LA VISTA DE UN CARRITO Y AGREGAR FUNCIONALIDAD AL BOTON DE ADD TO LIST DESDE LA VISTA DE DETAILS

import { Router } from "express";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";

const cartsRouter = Router();

//Endpoint para crear un carrito
cartsRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const one = await cartsManager.create(data);
    return res.json({
      statusCode: 201,
      message: "CREATED",
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

//Endpoint para leer todos los carritos creados
cartsRouter.get("/", async (req, res, next) => {
  try {
    const all = await cartsManager.read();
    return res.json({
      statusCode: 200,
      message: "READ",
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

//Endpoint para leer un carrito segun ID de usuario

cartsRouter.get("/user", async (req, res, next) => {
  try {
    const { user_id } = req.query;

    // Verificar explícitamente si user_id está definido
    if (!user_id) {
      const error = new Error("User ID is required");
      error.statusCode = 400;
      throw error;
    }

    const cart = await cartsManager.readCart({ user_id });
    if (cart.length > 0) {
      return res.json({
        statusCode: 200,
        message: "READ",
        response: cart,
      });
    } else {
      const error = new Error("Cart not found for user required");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.error("Error occurred:", error);  // Log para capturar cualquier error
    return next(error);
  }
});

//Endpoint para actualizar un carrito segun ID de usuario
cartsRouter.put("/:cid", async (req, res, next) => {
  try {
    const { cid } = req.params;
    const data = req.body;
    const one = await cartsManager.update(cid, data);
    return res.json({
      statusCode: 200,
      message: "UPDATED",
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

//Endpoint para borrar un carrito segun ID de usuario
cartsRouter.delete("/:cid", async (req, res, next) => {
  try {
    const { cid } = req.params;
    const one = await cartsManager.destroy({ _id: cid });

    if (one) {
      return res.json({
        statusCode: 200,
        message: "DELETED",
        response: one,
      });
    } else {
      throw new Error(`Failed to delete cart with ID ${cid}.`);
    }
  } catch (error) {
    return next(error);
  }
});
export default cartsRouter;

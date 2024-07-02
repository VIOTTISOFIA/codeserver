import { Router } from "express";
import { ObjectId } from "mongodb";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";

const cartsRouter = Router();

cartsRouter.post("/", create);
cartsRouter.get("/", read);
cartsRouter.get("/cart", readCart);
cartsRouter.put("/:cid", update);
cartsRouter.delete("/:cid", destroy);
cartsRouter.delete("/cart/:user_id", destroyAll);

//Endpoint para crear un carrito
async function create(req, res, next) {
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
}

//Endpoint para leer todos los carritos creados
async function read(req, res, next) {
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
}

//Endpoint para leer un carrito segun ID de usuario
async function readCart(req, res, next) {
  try {
    if (!req.session || !req.session.user) {
      const error = new Error("User session is required");
      error.statusCode = 400;
      throw error;
    }

    const user_id = req.session.user.user_id;
    console.log("user_id:", user_id);
    //console.log("user_id:", user_id);

    // Verificar explícitamente si user_id está definido
    if (!user_id) {
      const error = new Error("User ID is required");
      error.statusCode = 400;
      throw error;
    }

    const cart = await cartsManager.readCart({ user_id });
    //console.log(cart);
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
    console.error("Error occurred:", error);
    return next(error);
  }
}

//Endpoint para actualizar un carrito segun ID de usuario
async function update(req, res, next) {
  try {
    const { cid } = req.params;
    const { quantity } = req.body;
    const one = await cartsManager.update(cid, { quantity });
    return res.json({
      statusCode: 200,
      message: "UPDATED",
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}

//Endpoint para borrar un carrito segun ID de usuario
async function destroy(req, res, next) {
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
}

async function destroyAll(req, res, next) {
  try {
    const { user_id } = req.params;
    const userIdObject = new ObjectId(user_id);
    const result = await cartsManager.destroyAll(userIdObject);
    return res.json({
      statusCode: 200,
      message: "DELETED",
      response: result,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

export default cartsRouter;

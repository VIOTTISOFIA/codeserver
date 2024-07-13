import { Router } from "express";
import { ObjectId } from "mongodb";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";
import isAuth from "../../middlewares/isAuth.mid.js";
import CustomRouter from "../customRouter.js";

class CartsRouter extends CustomRouter {
  init() {
    //agrego politicas solo desde usuario porque el carrito solo se modifica desde el usuario logeado
    this.create("/", ["USER"], isAuth, create);
    this.read("/", ["USER"], read);
    this.read("/cart", ["USER"], readCart);
    this.update("/:cid", ["USER"], update);
    this.destroy("/:cid", ["USER"], destroy);
    this.destroy("/cart/:user_id", ["USER"], destroyAll);
  }
}

const cartsRouter = new CartsRouter();

//Endpoint para crear un carrito
async function create(req, res, next) {
  try {
    const data = req.body;
    const user_id = req.user._id;
    //console.log("user_id:", user_id)
    if (!user_id) {
      /* return res.statusCode(401).json({
        statusCode: 401,
        message: "Please login for adding to cart",
      }); */
      return res.response401("Please login for adding to cart");
    }
    // Añadir el user_id a los datos
    data.user_id = user_id;

    const one = await cartsManager.create(data);
    //return res.json({ statusCode: 201, message: "CREATED", response: one });
    return res.response201("CREATED");
  } catch (error) {
    return next(error);
  }
}

//Endpoint para leer todos los carritos creados
async function read(req, res, next) {
  try {
    const all = await cartsManager.read();
    //return res.json({ statusCode: 200, message: "READ", response: all });
    return res.response200("READ", all);
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

    // Acceder al user_id desde req.session.user
    const user_id = req.session.user.user_id;
    console.log("user_id:", user_id);

    // Verificar explícitamente si user_id está definido
    if (!user_id) {
      const error = new Error("User ID is required");
      error.statusCode = 400;
      throw error;
    }

    const cart = await cartsManager.readCart({ user_id });
    //console.log(cart);
    if (cart.length > 0) {
      //return res.json({ statusCode: 200, message: "READ", response: cart });
      return res.response200("READ", cart);
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
    /* return res.json({
      statusCode: 200,
      message: "UPDATED",
      response: one,
    }); */
    return res.response200("UPDATED", one);
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
      /* return res.json({
        statusCode: 200,
        message: "DELETED",
        response: one,
      }); */
      return res.response200("DELETED", one);
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
    /* return res.json({
      statusCode: 200,
      message: "DELETED",
      response: result,
    }); */
    return res.response200("DELETED", result);
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

export default cartsRouter.getRouter();

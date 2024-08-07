//import cartsManager from "../data/mongo/managers/CartsManager.mongo.js";
import { createService, destroyAllService, destroyService, readCartService, readService, updateService } from "../services/carts.service.js";
import { readOneService } from "../services/products.service.js";

//Endpoint para crear un carrito
async function create(req, res, next) {
  try {
    console.log("User:", req.user);
    const data = req.body;
    const user_id = req.user ? req.user._id : null;
    if (user_id) {
      data.user_id = user_id;
      const one = await createService(data);
      return res.response201("CREATED");
    } else {
      return res.error400("Please login for adding to cart");
    }
  } catch (error) {
    return next(error);
  }
}

//Endpoint para leer todos los carritos creados
async function read(req, res, next) {
  try {
    const all = await readService();
    return res.response200("READ", all);
  } catch (error) {
    return next(error);
  }
}

//Endpoint para leer un carrito segun ID de usuario
async function readCart(req, res, next) {
  try {
    if (!req.session || !req.user) {
      const error = new Error("User session is required");
      error.statusCode = 400;
      throw error;
    }

    // Acceder al user_id desde req.session.user
    const user_id = req.user._id;

    // Verificar explícitamente si user_id está definido
    if (!user_id) {
      const error = new Error("User ID is required");
      error.statusCode = 400;
      throw error;
    }

    const cart = await readCartService({ user_id });
    //console.log(cart);
    if (cart.length > 0) {
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
    const updatedCart = await updateService(cid, { quantity });
    const product = await readOneService(updatedCart.product_id);
    const subTotal = updatedCart.quantity * product.price;
    updatedCart.subTotal = subTotal;
    return res.response200("UPDATED", { updatedCart, subTotal });
  } catch (error) {
    return next(error);
  }
}

//Endpoint para borrar un carrito segun ID de usuario
async function destroy(req, res, next) {
  try {
    const { cid } = req.params;
    const one = await destroyService({ _id: cid });

    if (one) {
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
    const user_id = req.user._id;
    const userIdObject = new ObjectId(user_id);
    const result = await destroyAllService(userIdObject);
    return res.response200("DELETED", result);
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

export { create, read, readCart, update, destroy, destroyAll };

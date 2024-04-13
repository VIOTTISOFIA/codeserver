import { Router } from "express";
import productManager from "../../data/fs/ProductManager.fs.js";

const productsRouter = Router();

productsRouter.get("/", read);
productsRouter.get("/:nid", readOne);
productsRouter.post("/", create);
productsRouter.put("/:pid", update);
productsRouter.delete("/:pid", destroy);

async function read(req, res, next) {
  try {
    const { category } = req.query;
    const all = await productManager.read(category);
    if (all.length > 0) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      const error = new Error("Not found!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function readOne(req, res, next) {
      try {
        const { pid } = req.params;
        const one = await productManager.readOne(pid);
        if (one) {
          return res.json({
            statusCode: 200,
            response: one,
          });
        } else {
          const error = new Error("Not found!");
          error.statusCode = 404;
          throw error;
        }
      } catch (error) {
        return next(error);
      }
}

async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await productManager.create(data);
    if (one && one.id) {
      return res.json({
        statusCode: 201,
        message: "CREATED ID: " + one.id,
      });
    } else {
      throw new Error("Product ID not found in response");
    }
  } catch (error) {
    return next(error);
    };
  }

async function update(req, res, next) {
  try {
    const { pid } = req.params;
    const data = req.body;
    const one = await productManager.update(pid, data);
    return res.json({
      estatusCode: 200,
      message: "UPDATE ID: " + one.id,
    });
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { pid } = req.params;
    const one = await productManager.destroy(pid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}

export default productsRouter;

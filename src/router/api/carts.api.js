import { Router } from "express";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";

const cartsRouter = Router();

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
cartsRouter.get("/", async (req, res, next) => {
  try {
    const { user_id } = req.query;
    if (user_id) {
      const all = await cartsManager.read({ user_id });
      if (all) {
        return res.json({
          statusCode: 200,
          message: "READ",
          response: all,
        });
      }
    }
    const error = new Error("NOT FOUND");
    error.statusCode = 404;
    throw error;
  } catch (error) {
    return next(error);
  }
});
export default cartsRouter;

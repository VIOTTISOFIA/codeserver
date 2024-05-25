import { Router } from "express";
import productRouter from "./products.api.js";
import cartsRouter from "./carts.api.js";
import usersApi from "./users.api.js";

const apiRouter = Router();

apiRouter.use("/carts", cartsRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/users", usersApi);

export default apiRouter;

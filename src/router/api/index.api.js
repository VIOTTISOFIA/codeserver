import { Router } from "express";
import productRouter from "./products.api.js";
import usersRouter from "./users.api.js";

const apiRouter = Router();

apiRouter.use("/products", productRouter);
apiRouter.use("/users", usersRouter);

export default apiRouter;

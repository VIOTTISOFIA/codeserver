import { Router } from "express";
import productRouter from "./products.api.js";
import usersRouter from "./users.api.js";
import cartsRouter from "./carts.api.js";
import ticketsRouter from "./tickets.api.js";
import cookiesRouter from "./cookies.api.js";
import sessionRouter from "./sessions.api.js";

const apiRouter = Router();

apiRouter.use("/products", productRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/carts", cartsRouter);
apiRouter.use("/tickets", ticketsRouter);
apiRouter.use("/cookies", cookiesRouter);
apiRouter.use("/sessions", sessionRouter);

export default apiRouter;

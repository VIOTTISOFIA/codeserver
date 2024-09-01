import productRouter from "./products.api.js";
import usersRouter from "./users.api.js";
import cartsRouter from "./carts.api.js";
import ticketsRouter from "./tickets.api.js";
import cookiesRouter from "./cookies.api.js";
import sessionsRouter from "./sessions.api.js";
import CustomRouter from "../customRouter.js";
import PaymentRouter from "./payment.api.js";

class ApiRouter extends CustomRouter {
  init() {
    this.use("/products", productRouter);
    this.use("/users", usersRouter);
    this.use("/carts", cartsRouter);
    this.use("/tickets", ticketsRouter);
    this.use("/cookies", cookiesRouter);
    this.use("/sessions", sessionsRouter);
    this.use("/payment", PaymentRouter);
  }
}
const apiRouter = new ApiRouter();
export default apiRouter.getRouter();

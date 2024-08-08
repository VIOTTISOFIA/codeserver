import { ObjectId } from "mongodb";
import isAuth from "../../middlewares/isAuth.mid.js";
import CustomRouter from "../customRouter.js";
import {
  create,
  read,
  readCart,
  update,
  destroy,
  destroyAll,
} from "../../controllers/carts.controller.js";

class CartsRouter extends CustomRouter {
  init() {
    this.create("/", ["USER", "ADMIN"], isAuth, create);
    this.read("/", ["PUBLIC"]/* ["USER", "ADMIN"] */, isAuth, read);
    this.read("/cart", ["USER", "ADMIN"], isAuth, readCart);
    this.update("/:cid", ["USER", "ADMIN"], isAuth, update);
    this.destroy("/:cid", ["USER", "ADMIN"], isAuth, destroy);
    this.destroy("/cart/empty", ["USER", "ADMIN"], isAuth, destroyAll);
  }
}

const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();

import isValidAdmin from "../../middlewares/isValidAdmin.mid.js";
import validator from "../../middlewares/joi.mid.js";
import productSchema from "../../schemas/product.schema.js";
import CustomRouter from "../customRouter.js";
import {
  create,
  read,
  readOne,
  paginate,
  update,
  destroy,
} from "../../controllers/products.controller.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read("/paginate", ["PUBLIC"], paginate);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.create("/", ["ADMIN"], isValidAdmin, validator(productSchema), create);
    this.update("/:pid", ["ADMIN"], update);
    this.destroy("/:pid", ["ADMIN"], destroy);
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();

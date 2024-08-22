import isValidAdmin from "../../middlewares/isValidAdmin.mid.js";
import CustomRouter from "../customRouter.js";
import {
  create,
  read,
  readOne,
  paginate,
  update,
  destroy,
} from "../../controllers/products.controller.js";
import validator from "../../middlewares/joi.mind.js"; // Importa el middleware de validación
import productSchema from "../../schemas/product.schema.js"; // Importa el esquema de Joi

class ProductsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read("/paginate", ["PUBLIC"], paginate);
    this.read("/:pid", ["PUBLIC"], readOne);

    // Aplica el middleware de validación antes de la creación de un producto
    this.create("/", ["ADMIN"], isValidAdmin, validator(productSchema), create);

    // Aplica el middleware de validación antes de la actualización de un producto
    this.update("/:pid", ["ADMIN"], validator(productSchema), update);

    this.destroy("/:pid", ["ADMIN"], destroy);
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();

//import { Router } from "express";
//import productManager from "../../data/fs/ProductManager.fs.js";
//import productManager from "../../data/mongo/managers/ProductsManager.mongo.js";
import isValidAdmin from "../../middlewares/isValidAdmin.mid.js";
import CustomRouter from "../CustomRouter.js";
import { create, read, readOne, paginate, update, destroy } from "../../controllers/products.controller.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read("/paginate", ["PUBLIC"], paginate);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.create("/", ["ADMIN"], isValidAdmin, create);
    this.update("/:pid", ["ADMIN"], update);
    this.destroy("/:pid", ["ADMIN"], destroy);
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();

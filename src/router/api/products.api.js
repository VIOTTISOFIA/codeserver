// import { Router } from "express";
//import productManager from "../../data/fs/ProductManager.fs.js";
// import productManager from "../../data/mongo/managers/ProductsManager.mongo.js";
import isValidAdmin from "../../middlewares/isValidAdmin.mid.js";
import CustomRouter from "../customRouter.js";
// import dao from "../../data/dao.factory.js";
// const { productManager } = dao;
import {
  read,
  paginate,
  readOne,
  create,
  update,
  destroy,
} from "../../controllers/products.controller.js";

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

// async function read(req, res, next) {
//   try {
//     const { category } = req.query;
//     const all = await productManager.read(category);
//     if (all.length > 0) {
//       return res.response200(all);
//     } else {
//       const error = new Error("Not found!");
//       error.statusCode = 404;
//       throw error;
//     }
//   } catch (error) {
//     return next(error);
//   }
// }

// async function paginate(req, res, next) {
//   try {
//     const filter = {};
//     const opts = {};
//     if (req.query.limit) {
//       opts.limit = req.query.limit;
//     }
//     if (req.query.page) {
//       opts.page = req.query.page;
//     }
//     if (req.query.user_id) {
//       filter.user_id = req.query.user_id;
//     }

//     const all = await productManager.paginate({ filter, opts });
//     const info = {
//       page: all.page,
//       totalPages: all.totalPages,
//       limit: all.limit,
//       prevPage: all.prevPage,
//       nextPage: all.nextPage,
//     };
//     return res.paginate(all.docs, info);
//   } catch (error) {
//     return next(error);
//   }
// }

// async function readOne(req, res, next) {
//   try {
//     const { pid } = req.params;
//     const one = await productManager.readOne(pid);
//     if (one) {
//       return res.response200(one);
//     } else {
//       const error = new Error("Not found!");
//       error.statusCode = 404;
//       throw error;
//     }
//   } catch (error) {
//     return next(error);
//   }
// }

// async function create(req, res, next) {
//   try {
//     const data = req.body;
//     const one = await productManager.create(data);
//     return res.response201("CREATED ID: " + one.id);
//   } catch (error) {
//     return next(error);
//   }
// }

// async function update(req, res, next) {
//   try {
//     const { pid } = req.params;
//     const data = req.body;
//     const one = await productManager.update(pid, data);
//     return res.response200("UPDATED ID: " + one.id);
//   } catch (error) {
//     console.error("Error al actualizar el producto:", error);
//     return next(error);
//   }
// }

// async function destroy(req, res, next) {
//   try {
//     const { pid } = req.params;
//     const one = await productManager.destroy(pid);
//     return res.response200(one);
//   } catch (error) {
//     return next(error);
//   }
// }

export default productsRouter.getRouter();

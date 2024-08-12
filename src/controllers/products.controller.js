//import productManager from "../data/mongo/managers/ProductsManager.mongo.js";
import {
  createService,
  destroyService,
  readOneService,
  readService,
  updateService,
} from "../service/products.service.js";
class ProductsController {
  read = async (req, res, next) => {
    try {
      const { category } = req.query;
      const all = await readService(category);
      if (all.length > 0) {
        return res.response200(all);
      } else {
        const error = new Error("Not found!");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  };

  paginate = async (req, res, next) => {
    try {
      const filter = {};
      const opts = {};
      if (req.query.limit) {
        opts.limit = req.query.limit;
      }
      if (req.query.page) {
        opts.page = req.query.page;
      }
      if (req.query.user_id) {
        filter.user_id = req.query.user_id;
      }

      const all = await paginateService({ filter, opts });
      const info = {
        page: all.page,
        totalPages: all.totalPages,
        limit: all.limit,
        prevPage: all.prevPage,
        nextPage: all.nextPage,
      };
      return res.paginate(all.docs, info);
    } catch (error) {
      return next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const one = await readOneService(pid);
      if (one) {
        return res.response200(one);
      } else {
        const error = new Error("Not found!");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const data = req.body;
      const one = await createService(data);
      return res.response201("CREATED ID: " + one.id);
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const data = req.body;
      const one = await updateService(pid, data);
      return res.response200("UPDATED ID: " + one.id);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const one = await destroyService(pid);
      return res.response200(one);
    } catch (error) {
      return next(error);
    }
  };
}
const productsController = new ProductsController();
const { read, paginate, readOne, create, update, destroy } = productsController;
export { read, paginate, readOne, create, update, destroy };

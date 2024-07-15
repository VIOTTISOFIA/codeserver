import { Router } from "express";
//import productManager from "../../data/fs/ProductManager.fs.js";
import productManager from "../../data/mongo/managers/ProductsManager.mongo.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Obtengo productos paginados directamente con las opciones de paginación
    const result = await productManager.paginate({
      filter: {},
      opts: { page, limit },
    });

    // Renderizo la vista de productos con los datos obtenidos
    res.render("products", {
      products: result.docs.map((product) => ({
        id: product._id,
        photo: product.photo,
        title: product.title,
        category: product.category,
        price: product.price,
        stock: product.stock,
      })),
      total: result.totalDocs,
      page: result.page,
      pages: result.totalPages,
    });
  } catch (error) {
    return next(error);
  }
});

// Nueva ruta para manejar la paginación a partir de pagina 2
productsRouter.get("/paginate", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await productManager.paginate({
      filter: {},
      opts: { page, limit },
    });

    res.render("products", {
      products: result.docs.map((product) => ({
        id: product._id,
        photo: product.photo,
        title: product.title,
        category: product.category,
        price: product.price,
        stock: product.stock,
      })),
      total: result.totalDocs,
      page: result.page,
      pages: result.totalPages,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/real", async (req, res, next) => {
  try {
    const realProducts = await productManager.read();
    return res.render("real", { realProducts });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await productManager.readOne(pid);
    return res.render("details", { product: one });
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;

import {
  createService,
  destroyService,
  paginateService,
  readOneService,
  readService,
  updateService,
} from "../services/products.service.js";

async function read(req, res, next) {
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
    console.error("Error reading products:", error);
    return next(error);
  }
}

async function paginate(req, res, next) {
  try {
    const filter = {};
    const opts = {};
    if (req.query.limit) {
      opts.limit = parseInt(req.query.limit, 10);
    }
    if (req.query.page) {
      opts.page = parseInt(req.query.page, 10);
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
    console.error("Error paginating products:", error);
    return next(error);
  }
}

async function readOne(req, res, next) {
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
    console.error("Error reading product by ID:", error);
    return next(error);
  }
}

async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await createService(data);
    return res.response201("CREATED ID: " + one._id);
  } catch (error) {
    console.error("Error creating product:", error);
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const { pid } = req.params;
    const data = req.body;
    const one = await updateService(pid, data);
    return res.response200("UPDATED ID: " + one.id);
  } catch (error) {
    console.error("Error updating product:", error);
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { pid } = req.params;
    const one = await destroyService(pid);
    return res.response200("DELETED", one);
  } catch (error) {
    console.error("Error deleting product:", error);
    return next(error);
  }
}

export { read, paginate, readOne, create, update, destroy };

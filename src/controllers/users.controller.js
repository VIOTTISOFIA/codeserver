import { createService, destroyService, readOneService, readService, updateService } from "../services/users.service.js";

class UsersController {
  async read(req, res, next) {
    try {
      const { role } = req.query;
      const all = await readService(role);
      if (all.length > 0) {
        return res.response200(all);
      } else {
        const error = new Error("not found");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }

  //un parametro
  async readOne(req, res, next) {
    try {
      const { email } = req.session;
      const one = await readOneService(email);
      if (one) {
        return res.response200("CREATED", one);
      } else {
        const error = new Error("not found");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  async create(req, res, next) {
    try {
      const data = req.body;
      const one = await createService(data);
      return res.response201("CREATED ID: " + one.id);
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { uid } = req.params;
      const data = req.body;
      const one = await updateService(uid, data);
      return res.response200("CREATED ID: " + one.id);
    } catch (error) {
      return next(error);
    }
  }

  async destroy(req, res, next) {
    try {
      const { uid } = req.params;
      const one = await destroyService(uid);
      return res.response200("CREATED", one);
    } catch (error) {
      return next(error);
    }
  }
}

const usersController = new UsersController();
const { create, read, readOne, update, destroy } = usersController;
export { create, read, readOne, update, destroy };

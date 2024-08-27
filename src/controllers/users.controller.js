import {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
  readByEmailService,
} from "../services/users.service.js";

class UsersController {
  create = async (req, res, next) => {
    try {
      const data = req.body;
      const one = await createService(data);
      return res.response201("CREATED ID: " + one._id);
    } catch (error) {
      console.error("Error creating user:", error);
      return next(error);
    }
  };

  read = async (req, res, next) => {
    try {
      const { role } = req.query;
      const all = await readService(role);
      if (all.length > 0) {
        return res.response200(all);
      } else {
        const error = new Error("Not found");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      console.error("Error reading users:", error);
      return next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { email } = req.session;
      const one = await readOneService(email);
      if (one) {
        return res.response200("User found", one);
      } else {
        const error = new Error("Not found");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      console.error("Error reading user by email:", error);
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const data = req.body;
      const one = await updateService(uid, data);
      return res.response200("UPDATED ID: " + one.id);
    } catch (error) {
      console.error("Error updating user:", error);
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const one = await destroyService(uid);
      return res.response200("Deleted user", one);
    } catch (error) {
      console.error("Error deleting user:", error);
      return next(error);
    }
  };

  readByEmail = async (req, res, next) => {
    try {
      const { email } = req.session;
      const one = await readByEmailService(email);
      if (one) {
        return res.response200("User found", one);
      } else {
        const error = new Error("Not found");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      console.error("Error reading user by email:", error);
      return next(error);
    }
  };

  verifyCode = async (req, res, next) => {
    try {
      const { email, code } = req.body;
      const one = await readByEmailService(email);
      if (one && code === one.verifyCode) {
        await updateService(one._id, { verify: true });
        return res.response200("Verified User!");
      } else {
        return res.error400("Invalid credentials");
      }
    } catch (error) {
      console.error("Error verifying user code:", error);
      return next(error);
    }
  };
}

const usersController = new UsersController();
const { create, read, readOne, update, destroy, readByEmail, verifyCode } =
  usersController;
export { create, read, readOne, update, destroy, readByEmail, verifyCode };

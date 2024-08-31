import { Router } from "express";
import { verifyToken } from "../utils/token.util.js";
import usersRepository from "../repositories/users.rep.js";
import winston from "../utils/winston.util.js";

class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {}

  applyCbs(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        return params[2](error);
      }
    });
  }

  response = (req, res, next) => {
    res.response200 = (message, response) =>
      res.json({ statusCode: 200, message, response });
    res.response201 = (message) =>
      res.status(201).json({ statusCode: 201, message });
    res.paginate = (response, info) =>
      res.json({ statusCode: 201, response, info });
    res.error400 = (message) => {
      const errorMessage = `${req.method} ${
        req.url
      } 400 - ${new Date().toLocaleTimeString()} - ${message}`;
      winston.ERROR(errorMessage);
      return res.json({ statusCode: 400, message: message });
    };
    res.error401 = () => {
      const errorMessage = `${req.method} ${
        req.url
      } 401 - ${new Date().toLocaleTimeString()} - Bad auth from policies!`;
      winston.ERROR(errorMessage);
      return res.json({ statusCode: 401, message: "Bad auth from policies!" });
    };
    res.error403 = () => {
      const errorMessage = `${req.method} ${
        req.url
      } 403 - ${new Date().toLocaleTimeString()} - Forbidden from policies!`;
      winston.ERROR(errorMessage);
      return res.json({
        statusCode: 403,
        message: "Forbidden from policies!",
      });
    };
    res.error404 = () => {
      const errorMessage = `${req.method} ${
        req.url
      } 404 - ${new Date().toLocaleTimeString()} - Not found docs`;
      winston.ERROR(errorMessage);
      return res.json({ statusCode: 404, message: "Not found docs" });
    };

    return next();
  };

  policies = (policies) => async (req, res, next) => {
    if (policies.includes("PUBLIC")) return next();
    else {
      let token = req.cookies["token"];
      if (!token) return res.error401();
      else {
        try {
          token = verifyToken(token, process.env.SECRET_JWT);
          const { role, email } = token;
          if (
            (policies.includes("USER") && role === 0) ||
            (policies.includes("ADMIN") && role === 1)
          ) {
            const user = await usersRepository.readByEmailRepository(email);
            req.user = user;
            return next();
          } else return res.error403();
        } catch (error) {
          return res.error400(error.message);
        }
      }
    }
  };

  create(path, arrOfPolicies, ...callbacks) {
    this.router.post(
      path,
      this.response,
      this.policies(arrOfPolicies),
      this.applyCbs(callbacks)
    );
  }

  read(path, arrOfPolicies, ...callbacks) {
    this.router.get(
      path,
      this.response,
      this.policies(arrOfPolicies),
      this.applyCbs(callbacks)
    );
  }

  update(path, arrOfPolicies, ...callbacks) {
    this.router.put(
      path,
      this.response,
      this.policies(arrOfPolicies),
      this.applyCbs(callbacks)
    );
  }

  destroy(path, arrOfPolicies, ...callbacks) {
    this.router.delete(
      path,
      this.response,
      this.policies(arrOfPolicies),
      this.applyCbs(callbacks)
    );
  }

  use(path, ...callbacks) {
    this.router.use(path, this.response, this.applyCbs(callbacks));
  }
}

export default CustomRouter;

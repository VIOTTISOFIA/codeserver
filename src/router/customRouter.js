import { Router } from "express";
import { verifyToken } from "../utils/token.util.js";
import userManager from "../data/mongo/managers/UserManager.mongo.js";

class CustomRouter {
  //para contruir y configurar cada instancia del enrutador
  constructor() {
    this.router = Router();
    this.init();
  }

  //para obtener todas las rutas del enrutador definido
  getRouter() {
    return this.router;
  }

  //para inicializar las clases/propiedades heredadas(sub-routers)
  init() {}

  //para manejar las cbs (middlewares y la final)
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
    res.response201 = (message) => res.status(201).json({ statusCode: 201, message });
    res.paginate = (response, info) =>
      res.json({ statusCode: 201, response, info });
    res.error400 = (message) => res.status(400).json({ statusCode: 400, message });
    res.error401 = () =>
      res.json({ statusCode: 401, message: "Bad auth from policies!" });
    res.error403 = () =>
      res.json({ statusCode: 400, message: "Forbidden from policies!" });
    res.error404 = () =>
      res.json({ statudCode: 404, message: "Not found docs" });
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
            const user = await userManager.readByEmail(email);
            //proteger constraseña del usuario en el obj req.user
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

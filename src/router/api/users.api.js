import { Router } from "express";
// import userManager from "../../data/fs/UserManager.fs.js";
import userManager from "../../data/mongo/managers/UserManager.mongo.js";
import CustomRouter from "../customRouter.js";

//FALTA AGREGAR POLICIES Y RESPUESTAS AUTOMATICAS DE CUSTOM ROUTER

class UsersRouter extends CustomRouter {
  init() {
    this.create("/", create);
    this.read("/", read);
    this.read("/users", readOne);
    this.update("/:uid", update);
    this.destroy("/:uid", destroy);
  }
}

const usersApi = new UsersRouter();

async function read(req, res, next) {
  try {
    const { role } = req.query;
    const all = await userManager.read(role);
    if (all.length > 0) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      const error = new Error("not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function readOne(req, res, next) {
  try {
    const { email } = req.session;
    const one = await userManager.readOne(email);
    if (one) {
      return res.json({
        statusCode: 200,
        response: one,
      });
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

async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await userManager.create(data);
    return res.json({
      statusCode: 201,
      message: "CREATED ID: " + one.id,
    });
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const { uid } = req.params;
    const data = req.body;
    const one = await userManager.update(uid, data);
    return res.json({
      statusCode: 200,
      message: "UPDATE ID: " + one.id,
    });
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { uid } = req.params;
    const one = await userManager.destroy(uid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}

export default usersApi.getRouter();
// exporto

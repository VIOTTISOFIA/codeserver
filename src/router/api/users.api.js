import { Router } from "express";
// importo
// import userManager from "../../data/fs/UserManager.fs.js";
import userManager from "../../data/mongo/UserManager.mongo.js";

const usersApi = Router();
// genero
usersApi.get("/", read);
usersApi.get("/:uid", readOne);
usersApi.post("/", create);
usersApi.put("/:uid", update);
usersApi.delete("/:uid", destroy);

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

//un parametro
async function readOne(req, res, next) {
  try {
    const { uid } = req.params;
    const one = await userManager.readOne(uid);
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

export default usersApi;
// exporto

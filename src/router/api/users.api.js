import { Router, response } from "express";
import { ObjectId } from "mongodb";
// importo
// import userManager from "../../data/fs/UserManager.fs.js";
import userManager from "../../data/mongo/managers/UserManager.mongo.js";

const usersApi = Router();
// genero
usersApi.post("/", create);
usersApi.get("/", read);
usersApi.get("/users", readUser);
// usersApi.get("/:uid", readOne);
usersApi.put("/:uid", update);
usersApi.delete("/:uid", destroy);
usersApi.delete("/user/:user_id", destroyAll);
// preguntar si va user o users

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
    const user_id = req.session.user_id;
    console.log("user_id:", user_id);
    if (!user_id) {
      return res.status(401).json({
        statusCode: 401,
        message: "User not logged in",
      });
    }
    // Anadir el user_id a los datos
    data.user_id = user_id;

    const one = await userManager.create(data);
    return res.json({
      statusCode: 201,
      message: "CREATED ",
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}
//Endpoint para leer un user segun ID de usuario
async function readUser(req, res, next) {
  try {
    const { user_id } = req.query;

    // Verificar explícitamente si user_id está definido
    if (!user_id) {
      const error = new Error("User ID is required");
      error.statusCode = 400;
      throw error;
    }

    const user = await userManager.readUser({ user_id });
    //console.log(user);
    if (user.length > 0) {
      return res.json({
        statusCode: 200,
        message: "READ",
        response: user,
      });
    } else {
      const error = new Error("Cart not found for user required");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.error("Error occurred:", error); // Log para capturar cualquier error
    return next(error);
  }
}

//Endpoint para actualizar un user segun ID de usuario

async function update(req, res, next) {
  try {
    const { uid } = req.params;
    const data = req.body;
    const one = await userManager.update(uid, data);
    return res.json({
      statusCode: 200,
      message: "UPDATE",
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}

//Endpoint para borrar un USERS segun ID de usuario

async function destroy(req, res, next) {
  try {
    const { uid } = req.params;
    const one = await userManager.destroy({ _id: uid });

    if (one) {
      return res.json({
        statusCode: 200,
        response: one,
        message: "DELETED",
      });
    } else {
      throw new Error(`Failed to delete users with ID ${uid}.`);
    }
  } catch (error) {
    return next(error);
  }
}
async function destroyAll(req, res, next) {
  try {
    const { user_id } = req.params;
    console.log("user_id:", user_id);

    const userIdObject = new ObjectId(user_id);
    console.log("Conversion a ObjectId:", userIdObject);

    const result = await userManager.destroyAll(userIdObject);
    console.log("respuesta final", result);
    return res.json({
      statusCode: 200,
      message: "DELETED",
      response: result,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

export default usersApi;
// exporto

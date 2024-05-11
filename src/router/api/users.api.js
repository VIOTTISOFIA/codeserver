<<<<<<< HEAD
import { Router, response } from "express";
=======
import { Router } from "express";
>>>>>>> dev
// importo
import userManager from "../../data/fs/UserManager.fs.js";
const usersRouter = Router();
// genero
usersRouter.get("/", read);
usersRouter.get("/:uid", readOne);
usersRouter.post("/", create);
usersRouter.put("/:uid", update);
usersRouter.delete("/:uid", destroy);

async function read(req, res, next) {
  try {
    const { role } = req.query;
<<<<<<< HEAD
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
=======
    const users = await userManager.read(role);
    if (users) {
      return res.status(200).json({
        response: users,
        role,
        success: true,
      });
    } else {
      const error = new Error("not found");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
>>>>>>> dev
    return next(error);
  }
}

//un parametro
async function readOne(req, res, next) {
  try {
    const { uid } = req.params;
    const one = await userManager.readOne(uid);
    if (one) {
<<<<<<< HEAD
      return res.json({
        statusCode: 200,
        response: one,
=======
      return res.status(200).json({
        response: one,
        success: true,
>>>>>>> dev
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

export default usersRouter;
// exporto

import express from "express";
import userManager from "./data/fs/UserManager.fs.js";
const server = express();
const port = 8080;
const ready = () => console.log("server ready on port" + port);

server.listen(port, ready);

// middlewares
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// router
server.get("/", async (req, res) => {
  try {
    return res.status(200).json({
      statusCode: 200,
      message: "coder api OK",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: "coder api ERROR",
    });
  }
});

const create = async (req, res) => {
  try {
    const data = req.body;
    const one = await userManager.create(data);
    return res.json({
      statusCode: 201,
      message: "CREATED ID: " + one.id,
    });
  } catch (error) {
    return res.json({
      statusCode: error.statusCode || 500,
      message: error.message || "coder api ERROR",
    });
  }
};

const update = async (req, res) => {
  try {
    const { uid } = req.params;
    const data = req.body;
    const one = await userManager.update(uid, data);
    return res.json({
      statusCode: 200,
      message: "UPDATE ID: " + one.id,
    });
  } catch (error) {
    return res.json({
      statusCode: error.statusCode || 500,
      message: error.message || "coder api ERROR",
    });
  }
};

const destroy = async (req, res) => {
  try {
    const { uid } = req.params;
    const one = await userManager.destroy(uid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return res.json({
      statusCode: error.statusCode || 500,
      message: error.message || "coder api ERROR",
    });
  }
};

server.post("/api/users", create);
server.put("/api/users/:uid", update);
server.delete("/api/users/:uid", destroy);
// otra ruta para leer todos
// luego mando una consulta para hacer un filtro
server.get("/api/users", async (req, res) => {
  try {
    const { role } = req.query;
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
    return res.status(error.status).json({
      response: error.message,
      success: false,
      // message: "Usuario no existente",
    });
  }
});

//un parametro
server.get("/api/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const one = await userManager.readOne(uid);
    if (one) {
      return res.status(200).json({
        response: one,
        success: true,
      });
    } else {
      const error = new Error("not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      response: error.message,
      success: false,
    });
  }
});

// dos parametro

server.get("/api/users/:id/:role", async (req, res) => {
  try {
    const { id, role } = req.params;
    const data = { id, role };
    const one = await userManager.create(data);
    if (one) {
      return res.status(200).json({
        response: one,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      response: error.message,
      succcess: false,
    });
  }
});

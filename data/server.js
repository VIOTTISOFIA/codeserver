import express from "express";
import UserManager from "../fs/UserManager.fs.js";
const server = express();
const port = 8080;
const ready = () => console.log("server ready on port" + port);

server.listen(port, ready);

// middlewares

// router

server.get("/", async (req, respuesta) => {
  try {
    return respuesta.status(200).json({
      response: "coder api",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return respuesta.status(500).json({
      response: "CODER API ERROR",
      success: false,
    });
  }
});

// parametro

server.get("/api/users/:id/:role", async (req, res) => {
  try {
    const { id, role } = req.params;
    const data = { id, role };
    const users = await UserManager.create(data);
    return res.status(200).json({
      response: users,
      succcess: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      response: "null",
      succcess: true,
      message: "Usuario no existente",
    });
  }
});

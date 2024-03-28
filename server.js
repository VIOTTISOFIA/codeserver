import express from "express";
import userManager from "./data/fs/UserManager.fs.js";
const server = express();
const port = 8080;
const ready = () => console.log("server ready on port" + port);

server.listen(port, ready);

// middlewares
server.use(express.urlencoded({ extended: true }));

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
    const data = { uid, role };
    const one = await userManager.create(data);
    return res.status(200).json({
      response: one,
      succcess: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      response: "null",
      succcess: false,
      message: "Usuario no existente",
    });
  }
});

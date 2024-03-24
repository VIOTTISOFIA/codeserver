import express from "express";

const server = express();
const port = 8080;
const ready = () => console.log("server ready on port" + port);

server.listen(port, ready);

// middlewares

// router

server.get("/", async (requerimientos, respuesta) => {
  try {
    return respuesta.status(200).json({
      response: "CODER API",
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

server.get("/api/products/:title", async (req, res) => {
  try {
    const { title } = req.params;
    return res.status(201).json({
      response: title,
      succcess: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      response: "ERROR",
      succcess: true,
    });
  }
});

import express from "express";

const server = express();
const port = 8080;
const ready = () => console.log("server ready on port" + port);

server.listen(port, ready);

// middlewares
server.use(express.urlencoded({ extended: true }))

// router
server.get("/", async (requerimientos, respuesta) => {
  try {
    return respuesta.status(200).json({
      response: "Coder For Babys",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return respuesta.status(500).json({
      response: "CODER ERROR",
      success: false,
    });
  }
});

// parametro

server.get("/api/products", async (req, res) => {
  try {
      const { category } = req.query;
      const products = await readProducts(category);

      if (products.length !== 0) {
          return res.status(200).json({
              response: products,
              category,
              success: true
          });
      } else {
          const error = new Error("No se encontraron productos para la categoría especificada");
          error.statusCode = 404;
          throw error;
      }
  } catch (error) {
      console.log(error);
      return res.status(error.statusCode || 500).json({
          response: error.message || "Error interno del servidor",
          success: false
      });
  }
});


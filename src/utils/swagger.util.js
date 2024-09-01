import __dirname from "../../utils.js";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Baby Shop API",
      description: "Documentation of Baby Shop API",
    },
  },
  apis: [__dirname + "/src/docs/*.yaml"],
};

export default options;

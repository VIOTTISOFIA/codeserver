import __dirname from "../../utils.js";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Baby shop",
      description: "Documentation of Baby shop",
    },
  },
  apis: [__dirname + "/src/docs/*.yaml"],
};

export default options;

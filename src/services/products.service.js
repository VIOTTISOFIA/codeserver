//import productManager from "../data/fs/ProductManager.fs.js";
//import productManager from "../data/memory/ProductManager.memory.js";
import productManager from "../data/mongo/managers/ProductsManager.mongo.js";
import Service from "./service.js";

const productsService = new Service(productManager);
export const {
  createService,
  readService,
  readOneService,
  paginateService,
  updateService,
  destroyService,
} = productsService;

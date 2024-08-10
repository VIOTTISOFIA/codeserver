import Service from "./service.js";
//import productManager from "../data/fs/ProductManager.fs.js";
//import productManager from "../data/memory/ProductManager.memory.js";
//import productManager from "../data/mongo/managers/ProductsManager.mongo.js";
import productsRepository from "../repositories/products.rep.js";

const productsService = new Service(productsRepository);
export const {
  createService,
  readService,
  readOneService,
  paginateService,
  updateService,
  destroyService,
} = productsService;

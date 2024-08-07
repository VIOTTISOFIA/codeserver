import Service from "./service.js";
import productManager from "../data/mongo/managers/ProductsManager.mongo.js";

const productsService = new Service(productManager);
export const {
  createService,
  readService,
  readOneService,
  paginateService,
  updateService,
  destroyService,
} = productsService;

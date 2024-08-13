import Service from "./service.js";
//import cartsManager from "../data/mongo/managers/CartsManager.mongo.js";
//import cartsManager from "../data/fs/Carts.fs.js";
import cartsRepository from "../repositories/carts.rep.js";

const cartsService = new Service(cartsRepository);
export const {
  createService,
  readService,
  readOneService,
  readCartService,
  updateService,
  destroyService,
  destroyAllService,
} = cartsService;

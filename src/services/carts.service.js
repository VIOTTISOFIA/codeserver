import Service from "./service.js";
import cartsManager from "../data/mongo/managers/CartsManager.mongo.js";
//import cartsManager from "../data/fs/Carts.fs.js";

const cartsService = new Service(cartsManager);
export const {
  createService,
  readService,
  readOneService,
  readCartService,
  updateService,
  destroyService,
  destroyAllService
} = cartsService;

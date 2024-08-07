import userManager from "../data/mongo/managers/UserManager.mongo.js";
import Service from "./service.js";

const userService = new Service(userManager);
export const {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
} = userService;

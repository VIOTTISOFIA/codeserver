//import userManager from "../data/mongo/managers/UserManager.mongo.js";
//import userManager from "../data/fs/UserManager.fs.js";
import Service from "./service.js";
import dao from "../data/dao.factory.js";

const { users } = dao;
const userService = new Service(users);
export const {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
} = userService;

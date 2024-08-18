//import userManager from "../data/mongo/managers/UserManager.mongo.js";
//import userManager from "../data/fs/UserManager.fs.js";
import Service from "./service.js";
import usersRepository from "../repositories/users.rep.js";

const userService = new Service(usersRepository);
export const {
  createService,
  readService,
  readOneService,
  readByEmailService,
  updateService,
  destroyService,
} = userService;

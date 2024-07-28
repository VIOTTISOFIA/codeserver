import Service from "./service.js";
import userManager from "../data/fs/UserManager.fs.js";

const usersService = new Service(userManager);
export const {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
} = usersService;

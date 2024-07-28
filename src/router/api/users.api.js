//import { Router } from "express";
// import userManager from "../../data/fs/UserManager.fs.js";
import userManager from "../../data/mongo/managers/UserManager.mongo.js";
import CustomRouter from "../customRouter.js";
import {
  create,
  read,
  readOne,
  update,
  destroy,
} from "../../controllers/users.controller.js";

class UsersRouter extends CustomRouter {
  // genero
  init() {
    this.create("/", ["USER"], create);
    this.read("/", ["USER", "ADMIN"], read);
    this.read("/users", ["USER", "ADMIN"], readOne);
    this.update("/:uid", ["USER"], update);
    this.destroy("/:uid", ["USER"], destroy);
  }
}
const usersRouter = new UsersRouter();

export default usersRouter.getRouter();
// exporto

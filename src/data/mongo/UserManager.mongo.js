import User from "../mongo/models/user.model.js";
import Manager from "./Manager.mongo.js";
const userManager = new Manager(User);
export default userManager;

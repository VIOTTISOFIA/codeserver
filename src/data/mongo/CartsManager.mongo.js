import Manager from "./Manager.mongo.js";
import Cart from "./models/carts.model.js";

const cartsManager = new Manager(Cart)
export default cartsManager
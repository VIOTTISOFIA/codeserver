import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

const { persistence } = argsUtil;

class CartsDTO {
  constructor(data) {
    if (persistence === "mongo") {
      this.user_id = data.user_id;
      this.product_id = data.product_id;
    } else {
      this.user_id = data.user_id || crypto.randomBytes(12).toString("hex");
      this.product_id = data.product_id || crypto.randomBytes(12).toString("hex");
    }
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.quantity = data.quantity || 1;
    this.state = data.state || "reserved";
  }
}

export default CartsDTO;

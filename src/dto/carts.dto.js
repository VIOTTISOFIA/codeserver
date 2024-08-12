import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

const { persistence } = argsUtil;

class CartsDTO {
  constructor(data) {
    if (persistence !== "mongo") {
      this.user_id = crypto.randomBytes(12).toString("hex");
      this.product_id = crypto.randomBytes(12).toString("hex");
      this.createdAt = new Date();
      this.updatedAt = new Date();
      this.quantity = data.quantity || "1";
      this.state = data.state || "reserved";
    }
  }
}

export default CartsDTO;

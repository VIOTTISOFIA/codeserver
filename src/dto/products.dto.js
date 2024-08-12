import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

const { persistence } = argsUtil;

class ProductsDTO {
  constructor(data) {
    if (persistence !== "mongo") {
      this.id = crypto.randomBytes(12).toString("hex");
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }

    this.title = data.title;
    this.photo = data.photo || "images/package.png";
    this.category = data.category;
    this.price = data.price;
    this.stock = data.stock;
  }
}

export default ProductsDTO;

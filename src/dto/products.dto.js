import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

const persistence = argsUtil.persistence;

class ProductsDTO {
  constructor(data) {
    persistence !== "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.title = data.title;
    this.price = data.price;
    this.stock = data.stock;
    this.category = data.category;
    this.photo = data.photo || "https://i.postimg.cc/pVcL6v4t/package.png";
    persistence !== "mongo" && (this.createdAt = new Date());
    persistence !== "mongo" && (this.updatedAt = new Date());
  }
}

export default ProductsDTO;

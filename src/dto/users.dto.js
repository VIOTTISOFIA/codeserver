import argsUtil from "../utils/args.util.js";
import crypto from "crypto";
import { createHash } from "../utils/hash.util.js";

const persistence = argsUtil.persistence;

class UsersDTO {
  constructor(data) {
    if (persistence !== "mongo") {
      this._id = crypto.randomBytes(12).toString("hex");
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
    this.email = data.email;
    this.password = createHash(data.password);
    this.role = data.role || 0;
    this.photo =
      data.photo || "https://i.postimg.cc/cCWcV6X2/Profile-Avatar-PNG.jpg";
    this.verify = false;
    this.verifyCode = crypto.randomBytes(12).toString("hex");
  }
}

export default UsersDTO;

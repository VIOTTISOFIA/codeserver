import { Schema, Types, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "users";
const schema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0 },
    photo: {
      type: String,
      default: "https://i.postimg.cc/cCWcV6X2/Profile-Avatar-PNG.jpg",
    },

    user_id: {
      type: Types.ObjectId,
      ref: "users",
      index: true,
      required: true,
    },
    user: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoosePaginate);
// schema.pre("find", function () {
//   this.populate("user_id", "email photo -_id");
// });

const User = model(collection, schema);
export default User;

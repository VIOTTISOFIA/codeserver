import { Schema, Types, model } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0 },
    photo: {
      type: String,
      default: "https://www.pngplay.com/image/325510",
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
schema.pre("find", function () {
  this.populate("user_id", "email photo -_id");
});
schema.pre("findOneAndUpdate", function () {
  this.populate("user_id", "email");
});

const User = model(collection, schema);
export default User;

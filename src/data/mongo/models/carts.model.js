import { Schema, model, Types } from "mongoose";

const collection = "carts";
const schema = new Schema(
  {
    user_id: { type: Types.ObjectId, ref: "users", required: true },
    product_id: { type: Types.ObjectId, ref: "products", required: true },
    quantity: { type: number, required: true },
    state: {
      type: String,
      enum: ["Reserved", "Paid", "Delivered"],
      default: "reserved",
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("find", function () {
  this.populate("user_id", "email, role");
});
schema.pre("find", function () {
  this.populate("products_id", "");
});

const Cart = model(collection, schema);
export default Cart;

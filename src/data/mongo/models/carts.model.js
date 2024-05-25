import { Schema, Types, model } from "mongoose";

const collection = "carts";
const schema = new Schema(
  {
    user_id: {
      type: Types.ObjectId,
      ref: "users",
      index: true,
      required: true,
    },
    product_id: {
      type: Types.ObjectId,
      ref: "products",
      index: true,
      required: true,
    },
    quantity: { type: Number, default: 1 },
    state: {
      type: String,
      enum: ["reserved", "paid", "delivered"],
      default: "reserved",
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("find", function () {
  this.populate("user_id", "email photo -_id");
});

//Hacemos populacion de el producto con todos sus datos
schema.pre("find", function () {
  this.populate("product_id");
});

const Cart = model(collection, schema);
export default Cart;

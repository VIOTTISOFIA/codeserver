import { Schema, model } from "mongoose";

const collection = "carts";
const schema = new Schema(
  {
    user_id: { type: String, required: true },
    product_id: { type: String, required: true },
    quantity: { type: number, required: true },
    state: { type: String, enum: ["Reserved", "Paid", "Delivered"] },
  },
  {
    timestamps: true,
  }
);

const Cart = model(collection, schema);
export default Cart;

import { Schema, model } from "mongoose";

const collection = "products";

const schema = new Schema(
  {
    title: { type: String, required: true },
    photo: { type: String, default: "COLOCAR RUTA DE LAS IMAGENES"},
    category: {
      type: String,
      default: "Not defined",
      enum: [
        "Accesorios",
        "Indumentaria",
        "Muebles",
        "Calzado",
        "Jugueteria",
        "Deportes",
      ],
    },
    price: { type: Number },
    stock: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Product = model(collection, schema);
export default Product;

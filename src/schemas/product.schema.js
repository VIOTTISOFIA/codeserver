import Joi from "joi";

const productSchema = Joi.object({
  // user_id: Joi.string()
  //   .pattern(/^[0-9a-fA-F]{24}$/)
  //   .required(), // Validación de ObjectId de MongoDB
  title: Joi.string().min(1).max(255).required(),
  photo: Joi.string()
    .uri()
    .default("https://i.postimg.cc/pVcL6v4t/package.png"),
  category: Joi.string()
    .valid(
      "Not defined",
      "Accesorios",
      "Indumentaria",
      "Muebles",
      "Calzado",
      "Jugueteria",
      "Deportes"
    )
    .default("Not defined"),
  price: Joi.number().positive().precision(2).default(1),
  stock: Joi.number().integer().min(1).default(1),
});

export default productSchema;

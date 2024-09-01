import CustomError from "../utils/errors/CustomError.js";

function validator(schema) {
  return (req, res, next) => {
    const validation = schema.validate(req.body, { abortEarly: false });
    console.log("respuesta validator", validation.error);
    if (validation.error) {
      const message = validation.error.details.map((error) => error.message);
      CustomError.new({ statusCode: 400, message });
    }
    return next();
  };
}

export default validator;
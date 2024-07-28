import userManager from "../data/mongo/managers/UserManager.mongo.js";
import { verifyHash } from "../utils/hash.util.js";

async function isValidPassword(req, res, next) {
  try {
    const { email, password } = req.body;

    // Verificar que email y password no sean undefined o null
    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.statusCode = 400;
      throw error;
    }
    // Buscar usuario por email
    const one = await userManager.readByEmail(email);
    console.log("Usuario encontrado:", one);

    // Verificar si el usuario existe
    if (!one) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    // Verificar la contraseña
    const isValidPassword = verifyHash(password, one.password);
    console.log("Verificación de contraseña:", isValidPassword);
    if (!isValidPassword) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    // Si la contraseña es válida, continuar al siguiente middleware
    return next();
  } catch (error) {
    return next(error);
  }
}
export default isValidPassword;

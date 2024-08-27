async function isValidAdmin(req, res, next) {
  try {
    // Verifica que req.user esté definido antes de acceder a sus propiedades
    if (!req.user) {
      console.log("No user found in request.");
      const error = new Error("Forbidden");
      error.statusCode = 403;
      throw error;
    }

    const { role } = req.user;

    // Verifica el rol del usuario
    if (role !== 1) {
      console.log(`User with role ${role} is not an admin.`);
      const error = new Error("Forbidden");
      error.statusCode = 403;
      throw error;
    }

    // Si pasa todas las verificaciones, continúa al siguiente middleware
    console.log("User is an admin, proceeding.");
    return next();
  } catch (error) {
    // Logging del error antes de pasarlo al siguiente middleware
    console.error("Error in isValidAdmin middleware:", error);
    return next(error);
  }
}

export default isValidAdmin;

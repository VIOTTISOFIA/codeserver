import passport from "passport";

//Es una funcion que depende de la estrategia a implementar y devuelve:
//el error si ocurre
//los datos del usuario si existen
//la informacion correspondiente en caso de que no suceda lo anterior
//Es una funcion que devuelve un middleware

function passportCb(strategy) {
  return (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if (error) {
        return next(error);
      }
      if (user) {
        req.user = user;
        return next();
      }
      return res.json({
        statusCode: info.statusCode || 401,
        message: info.message ? info.message : info.toString,
      });
    })(req, res, next);
  };
}

export default passportCb;

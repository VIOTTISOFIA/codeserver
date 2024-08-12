class SessionsController {
  async register(req, res, next) {
    try {
      return res.status(201).json({
        message: "Registered!",
        statusCode: 201,
      });
    } catch (error) {
      return next(error);
    }
  }

  async login(req, res, next) {
    try {
      return res
        .cookie("token", req.user.token, { signed: true }) // Ajuste en signedCookie a signed
        .status(200)
        .json({
          message: "Logged in!",
          statusCode: 200,
        });
    } catch (error) {
      return next(error);
    }
  }

  async profile(req, res, next) {
    try {
      if (req.user.online) {
        return res.status(200).json(req.user);
        // usar respuestas default
      }
      const error = new Error("Bad auth");
      error.statusCode = 401;
      throw error;
    } catch (error) {
      return next(error);
    }
  }

  signout(req, res, next) {
    try {
      if (req.user) {
        return res.status(200).json({
          message: "Signed out!",
          statuCode: 200,
        });
      }
      const error = new Error("Invalid credentials from signout");
      error.statusCode = 401;
      throw error;
    } catch (error) {
      return next(error);
    }
  }

  google(req, res, next) {
    try {
      return res.status(200).send("Logged in with google!");
    } catch (error) {
      return next(error);
    }
  }
}

const sessionsController = new SessionsController();
const { register, login, signout, google, profile } = sessionsController;
export { register, login, signout, google, profile };

const register = async (req, res, next) => {
  try {
    return res.message201("User registered!");
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    return res.cookie("token", req.token).message200("User logged");
  } catch (error) {
    return next(error);
  }
};
export { register, login };

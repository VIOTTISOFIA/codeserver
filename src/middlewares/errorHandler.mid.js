function errorHandler(error, req, res, next) {
  return res.json({
    statusCode: error.statusCode || 500,
    message: error.message || "coder api ERROR",
  });
}
export default errorHandler;

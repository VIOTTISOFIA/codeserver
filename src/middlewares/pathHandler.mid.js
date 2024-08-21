function pathHandler(req, res, next) {
  return res.json({
    statusCode: 404,
    messege: `${req.method} ${req.url} not found path`,
  });
}
export default pathHandler;

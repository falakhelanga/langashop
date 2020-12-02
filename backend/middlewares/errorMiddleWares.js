export const routerNotFound = (req, res, next) => {
  res.status(404);
  const error = new Error("router not found");
  next(error);
};

export const errorController = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
  });
};

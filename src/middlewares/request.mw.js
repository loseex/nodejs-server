export const RequestLogger = (req, _, next) => {
  console.log(`[${req.method}] `.yellow + `${req.originalUrl}`.green);
  next();
};

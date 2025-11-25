//dummy auth

const isAuthorized = true;
const userId = "777";

export const authMiddleware = (req, res, next) => {
  if (!isAuthorized) {
    return res.status(403).send("User unauthorized.");
  }
  req.userId = userId;
  next();
};
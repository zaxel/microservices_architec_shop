//dummy auth
import { v4 as uuidv4 } from "uuid";

const isAuthorized = true;
const userId = uuidv4().slice(0,6);

export const authMiddleware = (req, res, next) => {
  if (!isAuthorized) {
    return res.status(403).send("User unauthorized.");
  }
  req.userId = userId;
  next();
};
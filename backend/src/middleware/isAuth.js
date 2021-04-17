const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  try {
    const token = authHeader.split(" ")[1];
    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    if (!verified) {
      req.isAuth = false;
      return next();
    } else {
      req.isAuth = true;
      req.userId = verified.userId;
      next();
    }
  } catch (err) {
    req.isAuth = false;
    return next();
  }
};

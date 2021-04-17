const User = require("../../database/users/users.model");

exports.login = async ({ email, password }) => {
  try {
    const authData = await User.login(email, password);
    return authData;
  } catch (error) {
    throw error;
  }
};
exports.isAuthenticated = (req) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
};

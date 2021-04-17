const User = require("../../database/users/users.model");
const { isAuthenticated } = require("./auth");

exports.users = async (args,req) => {
  try {
    isAuthenticated(req);
    const users = await User.find();
    return users.map((user) => {
      return { ...user._doc };
    });
  } catch (error) {
    throw error;
  }
};

exports.createUser = async (args) => {
  try {
    const savedUser = await User.registerUser({
      email: args.userInput.email,
      password: args.userInput.password,
    });
    return savedUser._doc;
  } catch (error) {
    throw error;
  }
};

const ApplicationError = require("../../config/errors/ApplicationError");
const authService = require("./auth");
const userRepository = require("./../repositories/user");

exports.create = async (payload, isAdmin) => {
  try {
    const { email, password, name, role } = payload;

    if (!email || !password) {
      throw new ApplicationError("Please input email and password", 500);
    }

    const encryptedPassword = await authService.encrypPassword(password);

    const user = await userRepository.create({
      name,
      email,
      encryptedPassword,
      role: isAdmin ? "ADMIN" : "MEMBER",
    });
    return user;
  } catch (err) {
    throw new ApplicationError(`Failed to add new user: ${err.message}`);
  }
};

exports.checkkUser = async (credential) => {
  try {
    const { email, password } = credential;

    if (!email || !password) {
      throw new ApplicationError("Please input email or password");
    }

    const user = await userRepository.findUserByEmail(email);

    if (!user) {
      throw new ApplicationError("Email not found", 500);
    }

    const checkedPassword = await authService.checkPassword(
      password,
      user.encryptedPassword
    );

    if (!checkedPassword) {
      throw new ApplicationError("Password is wrong", 500);
    }

    const token = authService.createToken({ id: user.id });

    const userWitToken = { ...user.dataValues, token };

    return userWitToken;
  } catch (err) {
    throw new ApplicationError(err.message, 500);
  }
};

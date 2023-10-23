const userService = require("./../services/user");

let users = [];

exports.registerAdmin = async (req, res) => {
  try {
    const body = req.body;

    const data = await userService.create(body, true);

    res.json({
      status: "OK",
      message: "Succesful",
      data: data,
    });
  } catch (err) {
    res.status(err.statusCode).json({
      status: "FAIL",
      message: err.message,
    });
  }
};

exports.register = async (req, res) => {
  try {
    const body = req.body;

    const data = await userService.create(body);

    res.json({
      status: "OK",
      message: "Succesful",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({
      status: "FAIL",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const credential = req.body;

    const user = await userService.checkkUser(credential);

    res.json({
      status: "OK",
      message: "Succesfully",
      data: user,
    });
  } catch (err) {
    res.status(err.statusCode).json({
      status: "FAIL",
      message: err.message,
    });
  }
};

exports.currentUser = (req, res) => {
  res.json({
    status: "OK",
    message: "Succesfully",
    data: req.user,
  });
};

const { Car } = require("./models");

const findAndSetCarsById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const car = await Car.findByPk(id);

    if (!car) {
      res.status(404).json({
        message: "Car not found!",
      });
    }
    req.car = car;
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  findAndSetCarsById,
};

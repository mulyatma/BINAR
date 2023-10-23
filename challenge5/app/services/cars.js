const carsRepository = require("../repositories/cars");
const ApplicationError = require("../../config/errors/ApplicationError");

exports.listCars = async (capacity) => {
  try {
    if (capacity) {
      const cars = await carsRepository.getListCarsByCapacity(capacity);
      return cars;
    }

    const cars = await carsRepository.getListCars();
    return cars;
  } catch (err) {
    throw new ApplicationError(
      `Failed to get list of cars: ${err.message}`,
      500
    );
  }
};

exports.getCarById = async (id) => {
  try {
    const car = await carsRepository.findByPk(id);
    return car;
  } catch (err) {
    throw new ApplicationError(
      `Failed to get list of car: ${err.message}`,
      500
    );
  }
};

exports.createCar = async (payload, userId) => {
  try {
    const car = await carsRepository.create(payload, userId);
    return car;
  } catch (err) {
    throw new ApplicationError(`Failed to create car: ${err.message}`, 500);
  }
};

exports.updateCarById = async (id, payload, userId) => {
  try {
    const car = await carsRepository.update(id, payload, userId);
    return car;
  } catch (err) {
    throw new ApplicationError(`Failed to update car: ${err.message}`, 500);
  }
};

exports.deleteCar = async (id, userId) => {
  try {
    await carsRepository.destroy(id);
    return carsRepository.update(id, { deletedBy: userId }, userId);
  } catch (err) {
    throw new ApplicationError(`Failed to delete cars: ${err.message}`, 500);
  }
};

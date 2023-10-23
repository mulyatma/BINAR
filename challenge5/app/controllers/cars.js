const { Cars } = require("../models");
const carsService = require("../services/cars");

const serverRespons = (req, res) => {
  res.status(200).send("API is alredy connected!");
};

const list = async (req, res) => {
  try {
    const { capacity } = req.query;
    const data = await carsService.listCars(capacity);
    res.json({
      status: "OK",
      message: "Succes",
      data: data,
    });
  } catch (err) {
    res.status(err.statusCode).json({
      status: "FAIL",
      message: err.message,
    });
  }
};

const details = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await carsService.getCarById(id);
    res.json({
      status: "OK",
      message: "Succes",
      data: data,
    });
  } catch (err) {
    res.status(err.statusCode).json({
      status: "FAIL",
      message: err.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const payload = req.body;
    const { id: userId } = req.user;

    const data = await carsService.createCar(payload, userId);
    res.json({
      status: "OK",
      message: "Succes",
      data: data,
    });
  } catch (err) {
    res.status(err.statusCode).json({
      status: "FAIL",
      message: err.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.car;
    const { id: userId } = req.user;

    const [__, data] = await carsService.updateCarById(id, body, userId);
    res.json({
      status: "OK",
      message: "Succes",
      data: data,
    });
  } catch (err) {
    res.status(err.statusCode).json({
      status: "FAIL",
      message: err.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const { id: userId } = req.user;

    const newData = await carsService.deleteCar(id, userId);
    res.json({
      status: "Berhasil Dihapus.",
    });
  } catch (err) {
    res.status(err.statusCode).json({
      status: "FAIL",
      message: err.message,
    });
  }
};

const findAndSetCarsById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const car = await Cars.findByPk(id);
    if (!car) {
      res.status(404).json({ status: "id tidak tersedia" });
      return;
    }
    req.car = car;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = {
  serverRespons,
  list,
  details,
  create,
  update,
  destroy,
  findAndSetCarsById,
};

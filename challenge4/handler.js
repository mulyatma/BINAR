const { randomUUID } = require("crypto");
const { Car } = require("./models");

const UUID = randomUUID();

function serverRespons(req, res) {
  res.status(200).json({ message: "ping succesfully" });
}

const handleListCars = async (req, res) => {
  const { id } = req.query;

  if (id) {
    const filtered = await Car.findAll({ where: { id } });
    res.status(200).json(filtered);
    return;
  }

  const result = await Car.findAll();
  res.status(200).json(result);
};

const handleGetCarById = (req, res) => {
  res.json(req.car);
};

const handleCreateCar = async (req, res) => {
  try {
    const body = req.body;
    const result = await Car.create(body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const handleUdateCar = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.car;
    const [_, data] = await Car.update(body, {
      where: { id },
      returning: true,
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const handleDeleteCar = async (req, res) => {
  try {
    const id = req.car.id;
    await Car.destroy({ where: { id } });
    res.json({ message: "berhasil dihapus" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  serverRespons,
  handleListCars,
  handleGetCarById,
  handleCreateCar,
  handleUdateCar,
  handleDeleteCar,
};

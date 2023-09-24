import cars from "./data/cars.json" assert { type: "json" };
import { randomUUID } from "crypto";

let tempCars = cars;

// GET Server Response
function serverRespons(req, res) {
  res.status(200).json({ message: "ping succesfully" });
}

// GET List Cars
function handleListCars(req, res) {
  res.status(201).json(tempCars);
}

// GET Car by Id
function handleListCarId(req, res) {
  const id = req.params.id;
  const filter = tempCars.filter((i) => i.id == id);
  res.status(200).json(filter);
}

// POST New Car
function handlePostCar(req, res) {
  const body = req.body;
  const newData = { id: randomUUID, ...body };
  tempCars.push(newData);
  res.status(201).json(newData);
}

// PUT Car
function handlePutCar(req, res) {
  const id = req.params.id;
  const currentData = tempCars.find((i) => i.id == id);
  const payload = req.body;
  const updatedData = { ...currentData, ...payload };

  const exisId = tempCars.findIndex((i) => i.id == id);

  tempCars[exisId] = updatedData;
  res.status(200).json(updatedData);
}

// DELETE Car by Id
function handleDeleteCar(req, res) {
  const id = req.params.id;
  const filter = tempCars.filter((i) => i.id !== id);
  tempCars = filter;
  res.json({ status: "berhasil dihapus" });
}
export {
  serverRespons,
  handleListCars,
  handleListCarId,
  handlePostCar,
  handlePutCar,
  handleDeleteCar,
};

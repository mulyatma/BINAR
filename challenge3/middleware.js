import { tempCars } from "./handler.js";

function setCar(req, res, next) {
  const car = tempCars.find(req.params.id);
  if (!car) {
    res.status(404).json({
      error: "Car not found!",
    });

    return;
  }

  req.car = car;
  next();
}

export { setCar };

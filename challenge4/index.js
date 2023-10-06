const Express = require("express");
const handler = require("./handler");
const middleware = require("./middleware");

const app = Express();
const port = 3000;

app.use(Express.json());

app.get("/", handler.serverRespons);
app.get("/cars", handler.handleListCars);
app.get("/cars/:id", middleware.findAndSetCarsById, handler.handleGetCarById);
app.post("/cars", handler.handleCreateCar);
app.put("/cars/:id", middleware.findAndSetCarsById, handler.handleUdateCar);
app.delete("/cars/:id", middleware.findAndSetCarsById, handler.handleDeleteCar);

app.get("*", (req, res) => {
  res.status(404).send("404 not found");
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});

import Express from "express";
import {
  serverRespons,
  handleListCars,
  handleListCarId,
  handlePostCar,
  handlePutCar,
  handleDeleteCar,
} from "./handler.js";

const app = Express();
const port = 3000;

app.use(Express.json());

app.get("/", serverRespons);
app.get("/cars", handleListCars);
app.get("/cars/:id", handleListCarId);
app.post("/cars", handlePostCar);
app.put("/cars/:id", handlePutCar);
app.delete("/cars/:id", handleDeleteCar);

app.get("*", (req, res) => {
  res.status(404).send("404 not found");
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});

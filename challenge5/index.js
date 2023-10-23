const express = require("express");
const carsController = require("./app/controllers/cars");
const userController = require("./app/controllers/user");
const authMiddleware = require("./app/middleware/auth");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/car-management.json");

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", carsController.serverRespons);
app.get("/cars", authMiddleware.authorize, carsController.list);
app.get(
  "/cars/:id",
  authMiddleware.authorize,
  carsController.findAndSetCarsById,
  carsController.details
);
app.post(
  "/cars",
  authMiddleware.authorize,
  authMiddleware.isSuperOrAdmin,
  carsController.create
);
app.put(
  "/cars/:id",
  authMiddleware.authorize,
  authMiddleware.isSuperOrAdmin,
  carsController.findAndSetCarsById,
  carsController.update
);
app.delete(
  "/cars/:id",
  authMiddleware.authorize,
  authMiddleware.isSuperOrAdmin,
  carsController.findAndSetCarsById,
  carsController.destroy
);
app.post(
  "/admin/register",
  authMiddleware.authorize,
  authMiddleware.isSuperAdmin,
  userController.registerAdmin
);
app.post("/register", userController.register);
app.post("/login", userController.login);
app.get("/current/user", authMiddleware.authorize, userController.currentUser);

app.get("*", (req, res) => {
  res.status(404).send("404 not found");
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

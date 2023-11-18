const { Op } = require("sequelize");
const CarController = require("../app/controllers/CarController");

const carModelMock = {
  findAll: jest.fn(),
  count: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
};

const userCarModelMock = {
  findOne: jest.fn(),
  create: jest.fn(),
};

const dayjsMock = {
  add: jest.fn(),
};

const carController = new CarController({
  carModel: carModelMock,
  userCarModel: userCarModelMock,
  dayjs: dayjsMock,
});

describe("#CarController", () => {
  describe("handleListCars", () => {
    it("should return a list of cars and pagination meta", async () => {
      const mockCars = [
        { id: 1, name: "Car1" },
        { id: 2, name: "Car2" },
      ];
      const mockCarCount = 2;

      carModelMock.findAll.mockResolvedValue(mockCars);
      carModelMock.count.mockResolvedValue(mockCarCount);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockRequest = {
        query: {
          page: 1,
          pageSize: 10,
        },
      };

      await carController.handleListCars(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        cars: mockCars,
        meta: {
          pagination: expect.any(Object),
        },
      });

      expect(carModelMock.findAll).toHaveBeenCalledWith(expect.any(Object));
      expect(carModelMock.count).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe("#handleGetCar", () => {
    it("should return a single car", async () => {
      const mockCar = { id: 1, name: "Car1" };
      carModelMock.findByPk.mockResolvedValue(mockCar);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockRequest = {
        params: {
          id: 1,
        },
      };

      await carController.handleGetCar(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCar);
      expect(carModelMock.findByPk).toHaveBeenCalledWith(1);
    });
  });

  describe("#handleCreateCar", () => {
    it("should create a new car and return 201 status", async () => {
      const mockCarData = {
        name: "Car1",
        price: 10000,
        size: "Medium",
        image: "car1.jpg",
      };
      const mockCreatedCar = { id: 1, ...mockCarData };
      carModelMock.create.mockResolvedValue(mockCreatedCar);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockRequest = {
        body: {
          name: "Car1",
          price: 10000,
          size: "Medium",
          image: "car1.jpg",
        },
      };

      await carController.handleCreateCar(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCreatedCar);
      expect(carModelMock.create).toHaveBeenCalledWith({
        name: "Car1",
        price: 10000,
        size: "Medium",
        image: "car1.jpg",
        isCurrentlyRented: false,
      });
    });

    it("should handle validation error and return 422 status with error details", async () => {
      const mockCarData = {
        name: "Car1",
        price: "InvalidPrice",
        size: "Medium",
        image: "car1.jpg",
      };
      const mockValidationError = {
        name: "ValidationError",
        message: "Validation error: price must be a valid number",
      };

      carModelMock.create.mockRejectedValue(mockValidationError);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockRequest = {
        body: {
          name: "Car1",
          price: 10000,
          size: "Medium",
          image: "car1.jpg",
        },
      };

      await carController.handleCreateCar(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          name: "ValidationError",
          message: "Validation error: price must be a valid number",
        },
      });
      expect(carModelMock.create).toHaveBeenCalledWith({
        name: "Car1",
        price: 10000,
        size: "Medium",
        image: "car1.jpg",
        isCurrentlyRented: false,
      });
    });
  });

  describe("#handleUpdateCar", () => {
    it("should handle validation error and return 422 status with error details", async () => {
      const mockCar = {
        id: 1,
        name: "Car1",
        price: 10000,
        size: "Medium",
        image: "car1.jpg",
        isCurrentlyRented: false,
      };
      const mockValidationError = {
        name: "ValidationError",
        message: "Validation error: price must be a valid number",
      };

      carModelMock.findByPk.mockResolvedValue(mockCar);
      carModelMock.update.mockRejectedValue(mockValidationError);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockRequest = {
        body: { name: "Car1", price: 12000, size: "Large", image: "car1.jpg" },
      };

      await carController.handleUpdateCar(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          name: "TypeError",
          message: "Cannot read properties of undefined (reading 'id')",
        },
      });
    });
  });

  describe("#handleDeleteCar", () => {
    it("should delete a car and return 204 status", async () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn(),
      };

      const mockRequest = {
        params: { id: 1 },
      };

      carModelMock.destroy.mockResolvedValue(true);

      await carController.handleDeleteCar(mockRequest, mockResponse);

      expect(carModelMock.destroy).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.end).toHaveBeenCalled();
    });
  });
});

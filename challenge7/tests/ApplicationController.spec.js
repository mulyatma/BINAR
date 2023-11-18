const ApplicationController = require("../app/controllers/ApplicationController");

describe("Applicationcontroller", () => {
  // handleGetRoot
  describe("#handleGetRoot", () => {
    it("should return status 200 and json message BCR API is up and running!", () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const mockRequest = {};

      const getRoot = new ApplicationController();
      getRoot.handleGetRoot(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "OK",
        message: "BCR API is up and running!",
      });
    });
  });

  // handleNotFound
  describe("#handleNotFound", () => {
    it("should respond with a 404 status and error details", () => {
      const mockRequest = { method: "GET", url: "/some-url" };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const notFound = new ApplicationController();
      notFound.handleNotFound(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          name: "Error",
          message: "Not found!",
          details: {
            method: mockRequest.method,
            url: mockRequest.url,
          },
        },
      });
    });
  });

  // handleError
  describe("#handleError", () => {
    it("should respond with a 500 status and error details", () => {
      const mockRequest = {};

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const error = new Error("Test Error");
      error.name = "TestError";
      error.details = "Some details";

      const errorHandler = new ApplicationController();
      errorHandler.handleError(error, mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          name: "TestError",
          message: "Test Error",
          details: "Some details",
        },
      });
    });

    it("should respond with a 500 status and error details is", () => {
      const mockRequest = {};

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const error = new Error("Test Error");
      error.name = "TestError";
      error.details = null;

      const errorHandler = new ApplicationController();
      errorHandler.handleError(error, mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          name: "TestError",
          message: "Test Error",
          details: null,
        },
      });
    });
  });

  // getOffsetFromRequest
  describe("#getOffsetFromRequest", () => {
    it("should return offset", () => {
      const mockRequest = {
        query: {
          page: 1,
          pageSize: 10,
        },
      };

      const offsetFromReq = new ApplicationController();
      const offset = offsetFromReq.getOffsetFromRequest(mockRequest);
      expect(offset).toBe(0);
    });
  });

  // buildPaginationObject
  describe("#buildPaginationObject", () => {
    it("should dividing pageCount by pageSize and return page, pageCount, pageSize, count", () => {
      const mockRequest = {
        query: {
          page: 1,
          pageSize: 10,
        },
      };

      const mockCount = 10;

      const buildPaginationObj = new ApplicationController();
      const build = buildPaginationObj.buildPaginationObject(
        mockRequest,
        mockCount
      );

      expect(build);
    });
  });
});

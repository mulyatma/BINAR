const AuthenticationController = require("../app/controllers/AuthenticationController");
const {
  EmailNotRegisteredError,
  WrongPasswordError,
  InsufficientAccessError,
  RecordNotFoundError,
} = require("../app/errors");

describe("AuthenticationController", () => {
  let authenticationController;

  const mockUserModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
  };

  const mockRoleModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
  };

  const mockBycrpt = {
    hashSync: jest.fn(),
    compareSync: jest.fn(),
  };

  const mockJwt = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  authenticationController = new AuthenticationController({
    userModel: mockUserModel,
    roleModel: mockRoleModel,
    bcrypt: mockBycrpt,
    jwt: mockJwt,
  });

  describe("#authorize", () => {
    it("should authorize correctly with valid role", () => {
      const mockRoleName = "CUSTOMER";
      const mockTokenPayload = {
        role: {
          name: mockRoleName,
        },
      };

      const mockRequest = {
        headers: {
          authorization: "Bearer mockToken",
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockNext = jest.fn();

      const authMiddleware = authenticationController.authorize(mockRoleName);

      authenticationController.decodeToken = jest
        .fn()
        .mockReturnValueOnce(mockTokenPayload);

      authMiddleware(mockRequest, mockResponse, mockNext);

      expect(authenticationController.decodeToken).toHaveBeenCalledWith(
        "mockToken"
      );
      expect(mockRequest.user).toEqual(mockTokenPayload);
      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it("should not authorize with invalid role", () => {
      const expectedError = new InsufficientAccessError("INVALID_ROLE");
      const mockRoleName = "CUSTOMER";
      const mockTokenPayload = {
        role: {
          name: "INVALID_ROLE",
        },
      };

      const mockRequest = {
        headers: {
          authorization: "Bearer mockToken",
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockNext = jest.fn();

      const middleware = authenticationController.authorize(mockRoleName);

      authenticationController.decodeToken = jest
        .fn()
        .mockReturnValueOnce(mockTokenPayload);

      middleware(mockRequest, mockResponse, mockNext);

      expect(authenticationController.decodeToken).toHaveBeenCalledWith(
        "mockToken"
      );
      expect(mockRequest.user).not.toEqual(mockTokenPayload);
      expect(mockNext).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          name: expectedError.name,
          message: expectedError.message,
          details: expectedError.details || null,
        },
      });
    });

    it("should not authorize without authorization token", () => {
      const mockRoleName = "CUSTOMER";
      const mockRequest = {
        headers: {},
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockNext = jest.fn();

      const authMiddleware = authenticationController.authorize(mockRoleName);

      authenticationController.decodeToken = jest.fn();

      authMiddleware(mockRequest, mockResponse, mockNext);

      expect(authenticationController.decodeToken).toHaveBeenCalled();
      expect(mockRequest.user).not.toBeDefined();
      expect(mockNext).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          details: null,
          message: "Cannot read properties of undefined (reading 'role')",
          name: "TypeError",
        },
      });
    });
  });

  describe("#handleLogin", () => {
    it("should return respond with 404 status if email is not registered", async () => {
      const mockRequest = {
        body: { email: "nonexistent@email.com", password: "password123" },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      authenticationController.userModel.findOne.mockResolvedValue(null);

      await authenticationController.handleLogin(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.any(EmailNotRegisteredError)
      );
    });

    it("should respond with a 401 status if the password is incorrect", async () => {
      const mockRequest = {
        body: { email: "nonexistent@email.com", password: "password123" },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      authenticationController.userModel.findOne.mockResolvedValue({
        encryptedPassword: "correctEncryptedPassword",
      });

      authenticationController.verifyPassword = jest
        .fn()
        .mockReturnValue(false);

      await authenticationController.handleLogin(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.any(WrongPasswordError)
      );
    });

    it("should respond with a 201 status and an access token if login is successful", async () => {
      const mockRequest = {
        body: { email: "nonexistent@email.com", password: "password123" },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      authenticationController.userModel.findOne.mockResolvedValue({
        encryptedPassword: "correctEncryptedPassword",
        Role: { name: "customer" },
      });

      authenticationController.verifyPassword = jest.fn().mockReturnValue(true);

      authenticationController.createTokenFromUser = jest
        .fn()
        .mockReturnValue("mockAccessToken");

      await authenticationController.handleLogin(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        accessToken: "mockAccessToken",
      });
    });
  });

  describe("#handleRegister", () => {
    it("should handle registration successfully", async () => {
      const mockRequest = {
        body: {
          name: "new user",
          email: "newuser@example.com",
          password: "password123",
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockRole = { id: 3, name: "CUSTOMER" };

      mockUserModel.findOne.mockResolvedValueOnce(null);
      mockRoleModel.findOne.mockResolvedValueOnce(mockRole);
      mockBycrpt.hashSync.mockReturnValueOnce("hashedPassword");
      mockUserModel.create.mockResolvedValueOnce({
        id: 4,
        name: mockRequest.body.name,
        email: mockRequest.body.email,
        encryptedPassword: "hashedPassword",
        roleId: mockRole.id,
      });
      mockJwt.sign.mockReturnValueOnce("mockedAccessToken");

      await authenticationController.handleRegister(mockRequest, mockResponse);

      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        where: { email: "newuser@example.com" },
      });
      expect(mockRoleModel.findOne).toHaveBeenCalledWith({
        where: { name: "CUSTOMER" },
      });
      expect(mockBycrpt.hashSync).toHaveBeenCalledWith("password123", 10);
      expect(mockUserModel.create).toHaveBeenCalledWith({
        email: "newuser@example.com",
        encryptedPassword: "hashedPassword",
        name: "new user",
        roleId: mockRole.id,
      });

      const result = mockJwt.sign();
      expect(typeof result).toBe("string");
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        accessToken: "mockAccessToken",
      });
    });

    it("should handle registration when email already exists", async () => {
      const mockRequest = {
        body: {
          name: "new user",
          email: "newuser@example.com",
          password: "password123",
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockNext = jest.fn();

      const existingUser = {
        id: 5,
        name: "Existing User",
        email: "newuser@example.com",
      };

      mockUserModel.findOne.mockResolvedValueOnce(existingUser);

      await authenticationController.handleRegister(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        where: { email: "newuser@example.com" },
      });
      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.any(EmailNotRegisteredError)
      );
      expect(mockNext).not.toHaveBeenCalled();
      expect(mockUserModel.create).not.toHaveBeenCalled();
      expect(mockJwt.sign).not.toHaveBeenCalled();
    });
  });

  describe("#handleGetUser ", () => {
    it("should retrieve user successfully", async () => {
      const mockUserId = 1;
      const mockUser = {
        id: mockUserId,
        name: "Mock User",
        email: "user@example.com",
        roleId: 2,
      };
      const mockRole = {
        id: 2,
        name: "CUSTOMER",
      };

      const mockRequest = {
        user: {
          id: mockUserId,
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockUserModel.findByPk.mockResolvedValueOnce(mockUser);

      mockRoleModel.findByPk.mockResolvedValueOnce(mockRole);

      const authController = new AuthenticationController({
        userModel: mockUserModel,
        roleModel: mockRoleModel,
        bcrypt: jest.fn(),
        jwt: jest.fn(),
      });

      await authController.handleGetUser(mockRequest, mockResponse);

      expect(mockUserModel.findByPk).toHaveBeenCalledWith(mockUserId);
      expect(mockRoleModel.findByPk).toHaveBeenCalledWith(mockUser.roleId);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
    });

    it("should handle user not found", async () => {
      const mockUserId = 1;

      const mockRequest = {
        user: {
          id: mockUserId,
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockUserModel.findByPk.mockResolvedValueOnce(null);

      const authController = new AuthenticationController({
        userModel: mockUserModel,
        roleModel: jest.fn(),
        bcrypt: jest.fn(),
        jwt: jest.fn(),
      });

      await authController.handleGetUser(mockRequest, mockResponse);

      expect(mockUserModel.findByPk).toHaveBeenCalledWith(mockUserId);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Object));
    });

    it("should handle role not found", async () => {
      const mockUserId = 1;
      const mockUser = {
        id: mockUserId,
        name: "Mock User",
        email: "user@example.com",
        roleId: 2,
      };

      const mockRequest = {
        user: {
          id: mockUserId,
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockUserModel.findByPk.mockReturnValueOnce(mockUser);

      mockRoleModel.findByPk.mockReturnValueOnce(null);

      const authController = new AuthenticationController({
        userModel: mockUserModel,
        roleModel: mockRoleModel,
        bcrypt: jest.fn(),
        jwt: jest.fn(),
      });

      await authController.handleGetUser(mockRequest, mockResponse);

      expect(mockUserModel.findByPk).toHaveBeenCalledWith(mockUserId);
      expect(mockRoleModel.findByPk).toHaveBeenCalledWith(mockUser.roleId);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe("createTokenFromUser", () => {
    it("should create a token for the user", () => {
      const mockUser = {
        id: 1,
        name: "Mock User",
        email: "user@example.com",
        image: "user.jpg",
        Role: {
          id: 2,
          name: "CUSTOMER",
        },
      };

      const mockRole = {
        id: 2,
        name: "CUSTOMER",
      };

      const expectedTokenPayload = {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        image: mockUser.image,
        role: {
          id: mockRole.id,
          name: mockRole.name,
        },
      };

      const expectedToken = "mockToken";

      const jwtMock = {
        sign: jest.fn().mockReturnValueOnce(expectedToken),
      };

      const authController = new AuthenticationController({
        userModel: jest.fn(),
        roleModel: jest.fn(),
        bcrypt: jest.fn(),
        jwt: jwtMock,
      });

      const result = authController.createTokenFromUser(mockUser, mockRole);

      expect(jwtMock.sign).toHaveBeenCalledWith(
        expectedTokenPayload,
        "Rahasia"
      );
      expect(result).toBe(expectedToken);
    });
  });

  describe("decodeToken", () => {
    it("should decode a valid token", () => {
      const mockToken = "mockToken";

      const expectedTokenPayload = {
        id: 1,
        name: "Mock User",
        email: "user@example.com",
        role: {
          id: 2,
          name: "CUSTOMER",
        },
      };

      mockJwt.verify.mockReturnValueOnce(expectedTokenPayload);

      const authController = new AuthenticationController({
        userModel: jest.fn(),
        roleModel: jest.fn(),
        bcrypt: jest.fn(),
        jwt: mockJwt,
      });

      const result = authController.decodeToken(mockToken);

      expect(mockJwt.verify).toHaveBeenCalledWith(mockToken, "Rahasia");
      expect(result).toEqual(expectedTokenPayload);
    });
  });

  describe("verifyPassword", () => {
    it("should return true for correct password", () => {
      const mockPassword = "password123";
      const mockEncryptedPassword = "hashedPassword";

      mockBycrpt.compareSync.mockReturnValueOnce(true);

      const authController = new AuthenticationController({
        userModel: jest.fn(),
        roleModel: jest.fn(),
        bcrypt: mockBycrpt,
        jwt: jest.fn(),
      });

      const result = authController.verifyPassword(
        mockPassword,
        mockEncryptedPassword
      );

      expect(mockBycrpt.compareSync).toHaveBeenCalledWith(
        mockPassword,
        mockEncryptedPassword
      );
      expect(result).toBe(true);
    });

    it("should return false for incorrect password", () => {
      const mockPassword = "wrongPassword";
      const mockEncryptedPassword = "hashedPassword";

      mockBycrpt.compareSync.mockReturnValueOnce(false);

      const authController = new AuthenticationController({
        userModel: jest.fn(),
        roleModel: jest.fn(),
        bcrypt: mockBycrpt,
        jwt: jest.fn(),
      });

      const result = authController.verifyPassword(
        mockPassword,
        mockEncryptedPassword
      );

      expect(mockBycrpt.compareSync).toHaveBeenCalledWith(
        mockPassword,
        mockEncryptedPassword
      );
      expect(result).toBe(false);
    });
  });
});

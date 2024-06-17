import { PrismaClient } from "@prisma/client";
import { UserRepository } from "./adapters/database";
import { UserService } from "../core/services";
import { AuthController, UserController } from "./adapters/controllers";
import { AuthService, PasswordService } from "./adapters/services";

// config 

const JWT_SECRET = process.env.JWT_SECRET || '';

// repository
const dbClient = new PrismaClient();
const userRepository = new UserRepository(dbClient);

// services
const authService = new AuthService(JWT_SECRET);
const passwordService = new PasswordService();
const userService = new UserService(userRepository,passwordService);


// controllers
const userController = UserController(userService);
const authController = AuthController(authService);


export { userController, authController} 


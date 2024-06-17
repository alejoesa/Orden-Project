import { IUser } from "../../../core/domain/interfaces";
import { IAuthService } from "../../../core/domain/ports/services";
import jwt from "jsonwebtoken";

export class AuthService implements IAuthService {
  constructor(private readonly jwtSecret: string) {}
  generateToken(user: IUser): string {
    return jwt.sign({ id: user.id, email: user.email }, this.jwtSecret, {
      expiresIn: "1h",
    });
  }
  login(user: IUser): string {
    throw new Error("Method not implemented.");
  }
}

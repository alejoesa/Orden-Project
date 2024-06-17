import { IPasswordService } from "../../../core/domain/ports/services";
import bcrypt from "bcrypt";
const SALT_ROUNDS: number = 10;

export class PasswordService implements IPasswordService {
  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }
  comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

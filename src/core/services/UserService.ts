import { IUser } from "../domain/interfaces";
import { IUserRepository } from "../domain/ports/persitence/IUserRepository";
import { IPasswordService } from "../domain/ports/services";
import { IUserService } from "../domain/ports/services/IUserService";

export class UserService implements IUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordService: IPasswordService
  ) {}

  async getById(id: number): Promise<IUser | null> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
  getAll(): Promise<IUser[]> {
    return this.userRepository.getAll();
  }
  async create(user: IUser): Promise<IUser> {
    const hashedPassword = await this.passwordService.hashPassword(
      user.password
    );
    const createdUser = await this.userRepository.create({
      email: user.email,
      password: hashedPassword,
    });
    return createdUser;
  }

  update(user: {
    id: number;
    email: string;
    password: string;
  }): Promise<{ id: number; email: string; password: string }> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

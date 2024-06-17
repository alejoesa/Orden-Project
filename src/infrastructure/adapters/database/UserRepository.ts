import { IUser } from "../../../core/domain/interfaces";
import { IDBClient } from "../../../core/domain/ports/persitence/IDBClient";
import { IUserRepository } from "../../../core/domain/ports/persitence/IUserRepository";

export class UserRepository implements IUserRepository{
    constructor(private readonly db: IDBClient) {}

    getById(id: number): Promise<IUser | null> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<IUser[]> {
        throw new Error("Method not implemented.");
    }
    create(user: IUser): Promise<IUser> {
        throw new Error("Method not implemented.");
    }
    
}
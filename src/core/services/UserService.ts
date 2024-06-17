import { IUser } from "../domain/interfaces";
import { IUserRepository } from "../domain/ports/persitence/IUserRepository";
import { IUserService } from "../domain/ports/services/IUserService";



export class UserService implements IUserService{

    constructor(private readonly userRepository: IUserRepository){
        
    }


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
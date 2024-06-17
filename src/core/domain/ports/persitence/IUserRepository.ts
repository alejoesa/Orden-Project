import { IUser, IUserCreate } from "../../interfaces";

export interface IUserRepository{
    getById(id: number): Promise<IUser | null>;
    getAll():Promise<IUser[]>;
    create(user: IUserCreate): Promise<IUser>;
}
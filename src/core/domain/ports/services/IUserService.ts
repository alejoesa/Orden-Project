import { IAccessToken, IUser } from "../../interfaces";

export interface IUserService{
    getById(id: number): Promise<IUser | null>;
    getAll():Promise<IUser[]>;
    create(user: IUser): Promise<IUser>;
    update(user: IUser): Promise<IUser>;
    deleteById(id: number): Promise<void>;
}
import { IUser } from "../../interfaces";

export interface IAuthService{
    generateToken(user: Omit<IUser, 'id'>): string;
    login(user: Omit<IUser, 'id'>): string;
}


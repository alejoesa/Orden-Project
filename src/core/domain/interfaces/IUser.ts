import { User } from '@prisma/client';

export type IUser = User;

export type IUserCreate = Omit<User, 'id'>


export interface IAccessToken{
    access_token: string;
}
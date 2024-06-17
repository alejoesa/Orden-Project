import { IUser } from "../../../core/domain/interfaces";
import { IUserService } from "../../../core/domain/ports/services";
import { Request, Response } from "express";

export interface IUserController {
  getById(req: Request, res: Response): Promise<IUser | null>;
  getAll(req: Request, res: Response): Promise<IUser[]>;
  create(req: Request, res: Response): Promise<IUser>;
  update(req: Request, res: Response): Promise<IUser>;
  deleteById(req: Request, res: Response): Promise<void>;
}

export function UserController(userService: IUserService): IUserController {
  async function getById(req: Request, res: Response): Promise<IUser | null> {
    return userService.getById(+req.params.id);
  }
  async function getAll(req: Request, res: Response): Promise<IUser[]> {
    return userService.getAll();
  }
  async function create(req: Request, res: Response): Promise<IUser> {
    const user = req.body;
    return userService.create(user);
  }

  async function update(req: Request, res: Response): Promise<IUser>{
    throw new Error('Method not implemented yet');
  }
  async function deleteById(req: Request, res: Response): Promise<void>{
    throw new Error('Method not implemented yet');
  }

  return {
    update,
    deleteById,
    getById,
    getAll,
    create,
  };
}

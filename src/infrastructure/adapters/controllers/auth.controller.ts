import { IAuthService } from "../../../core/domain/ports/services";
import { Request, Response } from 'express';

export interface IAuthController {
  register(req: Request, res: Response): Promise<{ access_token: string }>;
  login(req: Request, res: Response): Promise<{ access_token: string }>;
}

export function AuthController(authService: IAuthService): IAuthController {
  async function register(
    req: Request,
    res: Response
  ): Promise<{ access_token: string }> { 
    const { email, password } = req.body
    const acessToken = authService.generateToken({ email,password});
    return {access_token: acessToken};
  }
  async function login(
    req: Request,
    res: Response
  ): Promise<{ access_token: string }> {
    const { email, password } = req.body
    const acessToken = authService.login({ email,password});
    return {access_token: acessToken};
  }
  return { register, login };
}

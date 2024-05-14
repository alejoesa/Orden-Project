import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../services/password.service";
import { generateToken } from "../services/auth.service";
import prisma from "../models/user";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    const token = generateToken(user);
    res.status(201).json(token);
  } catch (err: any) {
    if (err?.code == "P2002" && err?.meta.target?.includes("email")) {
      res.status(400).json("El correo ingresado ya esta registrado");
    }
    console.error(err);
    res.status(500).json(err);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await prisma.findUnique({
    where: { email },
  });
  try {
    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }
    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ error: "Contraseña incorrecta" });
    }
    const token = generateToken(user);
    res.status(200).json(token);
  } catch (err) {
    console.log("Error:", err);
  }
};

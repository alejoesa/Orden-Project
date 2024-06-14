import { Request, Response } from 'express'
import { hashPassword } from '../services/password.service'
import prisma from '../models/user'
import { promises } from 'dns'

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body
    if (!email) {
      res.status(400).json({ Message: 'El correo es obligatorio' })
    }
    if (!password) {
      res.status(400).json({ Message: 'La contraseña es obligatoria' })
    }
    const hashedPassword = await hashPassword(password)
    const user = await prisma.create({
      data: {
        email,
        password: hashedPassword,
      },
    })
    res.status(201).json(user)
  } catch (error: any) {
    if (error?.code === 'P2002' && error?.meta?.target?.includes('email')) {
      res.status(400).json({ Message: 'El correo ya existe' })
    }
    console.log(error)
    res.status(500).json({ Error: 'Hubo un error, pruebe mas tarde' })
  }
}

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allUsers = await prisma.findMany()
    res.status(200).json(allUsers)
  } catch (error) {
    res.status(500).json({ Error: 'Hubo un error, pruebe mas tarde' })
  }
}

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id
    if (!id) {
      res.status(400).json({ Message: 'Debes ingresar un id valido' })
    }

    const user = await prisma.findUnique({
      where: {
        id: parseInt(id),
      },
      select: { id: true, email: true },
    })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ Error: 'Hubo un error, pruebe mas tarde' })
  }
}

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id
    let dataToUpdate: any = { ...req.body }

    if (!id) {
      res.status(400).json({ Message: 'Debes ingresar un id valido' })
    }
    if (!dataToUpdate.email) {
      res.status(400).json({ Message: 'El correo es obligatorio' })
    }
    if (!dataToUpdate.password) {
      res.status(400).json({ Message: 'La contraseña es obligatoria' })
    }

    const hashedPassword = await hashPassword(dataToUpdate.password)

    const updatedUser = await prisma.update({
      where: {
        id: parseInt(id),
      },
      data: dataToUpdate,
    })
    res.status(200).json(updatedUser)
  } catch (error: any) {
    if (error?.code === 'P2002' && error?.meta?.target?.includes('email')) {
      res.status(400).json({ Message: 'El correo ya existe' })
    }
    console.log(error)
    res.status(500).json({ Error: 'Hubo un error, pruebe mas tarde' })
  }
}

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id
    if (!id) {
      res.status(400).json({ Message: 'Debes ingresar un id valido' })
    }
    const deletedUser = await prisma.delete({
      where: {
        id: parseInt(id),
      },
    })
    res.status(200).json({ Message: 'Usuario eliminado' })
  } catch (error) {
    res.status(500).json({ Error: 'Hubo un error, pruebe mas tarde' })
  }
}

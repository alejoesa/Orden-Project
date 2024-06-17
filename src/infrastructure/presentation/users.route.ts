import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import express from 'express'
import { userController } from '../di'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'

//Middleware de jwt para ver si estamos autenticados
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({ Error: 'No autorizado' })
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Error en la autoticacion: ', err)
      return res.status(403).json({ Error: 'No tiene acceso a este recurso' })
    }
    next()
  })
}

router.post('/create', authenticateToken, userController.create)
router.get('/', authenticateToken, userController.getAll)
router.get('/:id', authenticateToken, userController.getById)
router.put('/:id', authenticateToken, userController.update)
router.delete('/:id', authenticateToken, userController.deleteById)

export default router
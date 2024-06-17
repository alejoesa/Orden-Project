import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import usersRoutes from './infrastructure/presentation/users.route';
import authRoutes from './infrastructure/presentation/auth.route';

const app = express()

app.use(express.json())

//Routes
app.use('/auth', authRoutes)
app.use('/users', usersRoutes)

export default app

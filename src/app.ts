import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(express.json());

//Routes
app.use("/auth", authRoutes);
//app.use("/users");
//app.use("/tasks");
//app.use("/finance");

export default app;

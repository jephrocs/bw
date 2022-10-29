import express from "express";
import userRoutes from "./routes/users.js";
import loginRoutes from "./routes/login.js"

const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(loginRoutes);


export default app;
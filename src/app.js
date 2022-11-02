import express from "express";
import userRoutes from "./routes/users.js";
import loginRoutes from "./routes/login.js"
import flash from 'connect-flash';
import * as path from 'path';
import session from 'express-session';
import cors from 'cors';

const app = express();

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });
app.use(cors({
  origin: '*'
}));
app.use(express.urlencoded({ extended: false }))
app.use(flash());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
  }));
app.use(express.json());
app.use(userRoutes);
app.use(loginRoutes);


export default app;
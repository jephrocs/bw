import express from "express";
import userRoutes from "./routes/users.js";
import loginRoutes from "./routes/login.js"
import flash from 'connect-flash';
import * as path from 'path';
import session from 'express-session';


const app = express();
app.set('views', path.join('./src/', 'views'))
app.set('view engine', 'ejs')
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
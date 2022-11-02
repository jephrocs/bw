import { Router} from "express";
import { register, logIn } from "../handlers/login.handler.js";
import passport from "passport";
import {configurePassport} from '../services/login.js';
import { Strategy as strategy} from 'passport-local';

const router = Router()
passport.use('password', strategy);
configurePassport(passport);


router.post('/signup', register);
router.post('/login', logIn);
router.get('/logout', function(req, res) {
  req.logout();
 res.json({"message":"log out sucessful"})
})


export default router;
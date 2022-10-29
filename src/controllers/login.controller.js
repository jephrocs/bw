import {getConnection} from '../database.js';
import {configurePassport, signUp} from './authService.js'
import passport from 'passport'
import {body} from 'express-validator';
import {User} from '../models/user.js';

    
configurePassport(passport);


export const validsignup = (req, res)=>{
var password2 = req.body.password2
console.log(req.body.name.first)
 const reqUser =  new User(
    '',
    '',
    req.body.isActive,
    req.body.balance,
    req.body.picture,
    req.body.age,
    req.body.eyeColor,
    req.body.name.first,
    req.body.name.last,
    req.body.company,
    req.body.email,
    '',
    req.body.password,
    req.body.phone,
    req.body.address,
  );
  // validate form data
  body('name', 'Name is required').notEmpty();
  body('password', 'Password is required').notEmpty();
  body('password2', 'Confirm password is required').notEmpty();
  body('password', 'Password do not match').equals(password2);

//   // check for errors
//   var errors = req.validationErrors();
//   // if there are errors, display signup page
//   if (errors) {
//     return res.send( {errors: errors.map(function(error) {return error.msg})})
//   }

  var options = {
    reqUser,
    successRedirectUrl: '/',
   // signUpTemplate: signup_view_path,
  }
  signUp(options,res);

}
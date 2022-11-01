import {Router} from "express";
import { validsignup } from "../controllers/login.controller.js";
import passport from "passport";
import {configurePassport} from '../controllers/authService.js';

import { Strategy as strategy} from 'passport-local';
const router = Router()
passport.use('password', strategy);
configurePassport(passport);
// var signup_view_path = path.join('auth', 'signup');
// var login_view_path = path.join('auth', 'login');

// // display signup page only if user is not logged in
// router.get('/signup', isLoggedOut(), function(req, res) {
//   res.render(signup_view_path)
// })

// create user
router.post('/signup', validsignup);

// // display login page  af user is not logged in
// router.get('/login', isLoggedOut(), function(req, res) {
//   res.render(login_view_path, { errors: [] })
// })



router.get('/login', function(req, res, next) {
    res.render('login');
  });


// peform login

const isLocalAuthenticated = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); } //error exception

        // user will be set to false, if not authenticated
        if (!user) {
            res.status(401).json(info); //info contains the error message
        } else {
            // if user authenticated maintain the session
            req.logIn(user, function() {
res.json({'message':'a winner is you'})            })
        }    
    })(req, res, next);
}
router.post(
  '/login',
  isLocalAuthenticated
)

// logout user
router.get('/logout', function(req, res) {
  req.logout();
 // req.flash('success', 'You are logged out');
  res.redirect('/')
})

// display profile page if user is logged in
router.get('/profile', isLoggedIn(), function(req, res) {
  var dbUser =  db.get('users').find({ id: req.user.id }).value();

 // res.render('profile', { dbUser:  dbUser })
})

//==========================
// middleware
//==========================

// isAuthenticated comes from passport;
// when a user is logged in, isAuthenticated return true.

function isLoggedIn () {
	return (req, res, next) => {
    // if there is a logged in user, do the next thing, and execute the
    // function for the route
    if (req.isAuthenticated()) { return next() };

    // if there isn't a login user, skip the function for the route, and
    // redirect to the login page
    return res.redirect('/login')
	}
}

function isLoggedOut () {
	return (req, res, next) => {
    // if there isn't a login user, execute the function for the route
    if (!req.isAuthenticated()) { return next() };

    // if there is a logged in user, redirect
    return res.redirect('/')
	}
}
export default router;
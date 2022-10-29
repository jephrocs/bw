import {Router} from "express";
import { validsignup } from "../controllers/login.controller.js";
import passport from "passport";
const router = Router()

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

// peform login
router.post(
  '/login',
  passport.authenticate(
    'local',
    {
      successRedirect:'/',
      failureRedirect:'/login',
      failureFlash: true,
      successFlash: 'You are logged in',
    }
  )
)

// logout user
router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You are logged out');
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
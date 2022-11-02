import { configurePassport, signUp } from '../services/login.js'
import passport from 'passport'
import { User } from '../models/user.js';
import pkg from 'jsonwebtoken';
const {sign} = pkg;


configurePassport(passport);


export const logIn = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			res.status(401).json(info); 
		} else {
			req.logIn(user, function() {
				sign({user}, 'bluewhite', (err, token)=>{
					if (err) {
						return next(err);
					}
					
					console.log({token: token, user:user})
					res.json({token: token, user:user})
				});
			})
		}
	})(req, res, next);
}

export const register = (req, res) => {
	console.log('registering....',req.body)
	const u = req.body;
	if (u.email == "") {
		res.status(422).json({
			'message': 'You must have an email'
		}); //info contains the error message
	} else {
		try {
			const reqUser = new User(
				'',
				'',
				u.isActive,
				u.balance,
				u.picture,
				u.age,
				u.eyeColor,
				u.name.first,
				u.name.last,
				u.company,
				u.email,
				u.password,
				'',
				u.phone,
				u.address,
			);
			signUp(reqUser, res);
		} catch (error) {
			return res.status(500).send({
				message: error.message
			});
		}
	}
}
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local'
import shortid from 'shortid'
import { User } from '../models/user.js';
import { addUser, getUserByEmail, getUser } from '../repos/users.js';

let salty = '';

function hashPassword(plaintextPassword) {
    var salt = bcrypt.genSaltSync(10);
    salty = salt
    return bcrypt.hashSync(plaintextPassword, salt);
}

function comparePassword(plaintextPassword, hashPassword) {
    return bcrypt.compareSync(plaintextPassword, hashPassword);
}

export const signUp = async (u, res) => {
    const newUser = new User(
      shortid.generate(),
      "GU0-" + shortid.generate(),
      u.isActive,
      u.balance,
      u.pic,
      u.age,
      u.eyeColor,
      u.name.first,
      u.name.last,
      u.company,
      u.email,
      hashPassword(u.password),
      salty.toString(),
      u.phone,
      u.address
  )
    var email = getUserByEmail(u.email);
    if (!!email) {
        res.json("Email already exists");
    } else {
        addUser(newUser);
        res.json(newUser);
    }
}

// configure passport
export const configurePassport = function(passport) {
    // Passport serializes and deserializes user instances to and from the session.

    // only the user ID is serialized and added to the session
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    // for every request, the id is used to find the user, which will be restored
    // to req.user.
    passport.deserializeUser(function(_id, done) {
        // find user in database
        const user = getUser(_id);
        if (!user) {
            done({
                message: 'Invalid credentials.'
            }, null);
        } else {
            // the object is what will be available for 'request.user'
            done(null, {
                _id: user._id,
                email: user.email
            })
        }
    });

    // LocalStrategy uses username / password in the database for authentication.
    passport.use(new LocalStrategy({ 
            usernameField: 'email',
            passwordField: 'password'
        },
        function(emailz, passwordz, done) {
            // look for user in database
            var foundUser = getUserByEmail(emailz);
            if (!foundUser) {
                return done(null, false, {
                    message: 'Invalid Email'
                });
            }
            // check if password matches
            var passwordsMatch = comparePassword(passwordz, foundUser.password);
            if (!passwordsMatch) {
                return done(null, false, {
                    message: 'Invalid Password.'
                });
            }
            //else, if username and password match, return the user
            return done(null, foundUser)
        }
    ))
}



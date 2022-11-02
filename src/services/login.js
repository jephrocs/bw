import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local'
import shortid from 'shortid'
import { User } from '../models/user.js';
import { addUser, getUserByEmail, getUser } from '../repos/users.js';

//Variable to save salt
let salty = '';

function hashPassword(plaintextPassword) {
    var salt = bcrypt.genSaltSync(10);
    salty = salt
    return bcrypt.hashSync(plaintextPassword, salt);
}

function comparePassword(plaintextPassword, hashPassword) {
    return bcrypt.compareSync(plaintextPassword, hashPassword);
}

//Random Balance generator 
const balance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
  });
export const signUp = async (u, res) => {
    const newUser = new User(
      shortid.generate(),
      "GU0-" + shortid.generate(),
      true,
      balance.format(Math.floor(Math.random() * 10)),
      'https://placehold.jp/300x300.png',
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
        res.json({"message": "Email Already exists"
    });
    } else {
        addUser(newUser);
        console.log("Registered USER: ",newUser)
        
        res.json({newUser:newUser,message: "Registration Sucessful!"
        });
    }
}

// configure passport
export const configurePassport = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(_id, done) {
        const user = getUser(_id);
        if (!user) {
            done({
                message: 'Invalid credentials.'
            }, null);
        } else {
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
            var foundUser = getUserByEmail(emailz);
            if (!foundUser) {
                return done(null, false, {
                    message: 'Invalid Email'
                });
            }
            var passwordsMatch = comparePassword(passwordz, foundUser.password);
            if (!passwordsMatch) {
                return done(null, false, {
                    message: 'Invalid Password.'
                });
            }
            //If username and password match, return the user
            return done(null, foundUser)
        }
    ))
}



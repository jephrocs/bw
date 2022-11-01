import bcrypt from 'bcryptjs';
import {Low} from "lowdb";
import {join, dirname} from 'path'
import { Strategy as LocalStrategy} from 'passport-local'
import {fileURLToPath} from 'url'
import passport from 'passport'
import { JSONFile } from 'lowdb/node'
import shortid from 'shortid'
import {getConnection} from '../database.js'; 
import {User} from '../models/user.js';
let db;
let salty='';
const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, '../db.json')
const adapter = new JSONFile(file);
db = new Low(adapter);


function hashPassword(plaintextPassword) {
  var salt = bcrypt.genSaltSync(10);
  salty = salt
  console.log(plaintextPassword)
  return bcrypt.hashSync(plaintextPassword, salt);
}


function comparePassword(plaintextPassword, hashPassword) {
    console.log(plaintextPassword, " ", hashPassword)
  return bcrypt.compareSync(plaintextPassword, hashPassword);
}

export const signUp = async (options, res)=> {
  const db = getConnection();
  var email = db.data.users.find(user=>user.email==options.reqUser.email )

 const u = options.reqUser;
  if(!!email){
    res.json("Email already exists");
  }
  else {
    // save new user to database
    const db = getConnection();
  const newUser = new User(
        shortid.generate(),
       "GU0-"+ shortid.generate(),
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
    db.data.users.push(newUser)
    await db.write();
    console.log('New User:',newUser);
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
   // var user = db.get('users').find({_id: _id}).value()
    const user = getConnection().data.users.find(user=>user._id===_id );
    if(!user) {
      done({ message: 'Invalid credentials.' }, null);
    } else {
      // the object is what will be available for 'request.user'
      done(null, {_id: user._id, email: user.email})
    }
  });

  // configures how to autheticate a user when they log in.

  // LocalStrategy uses username / password in the database for authentication.
  passport.use(new LocalStrategy({ // or whatever you want to use
    usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
    passwordField: 'password'
  },
    function( emailz, passwordz, done) {
      // look for user in database
      const db = getConnection();
      
      var foundUser = db.data.users.find(user=>user.email == emailz)
      if(!foundUser) {
        return done(null, false, { message: 'Invalid Email' });
      }

      // check if password matches
      var passwordsMatch = comparePassword(passwordz, foundUser.password);
      if(!passwordsMatch) {
        return done(null, false, { message: 'Invalid Password.' });
      }

      //else, if username and password match, return the user
      return done(null, foundUser)
    }
))}


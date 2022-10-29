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
        hashPassword(u.password).toString(),
        salty.toString(),
        u.phone,
        u.address
     )
    db.data.users.push(newUser)
    await db.write();
    console.log('newuser',newUser);
    res.json(newUser);
  }
}

// configure passport
export const configurePassport = function(passport) {
  // Passport serializes and deserializes user instances to and from the session.

  // only the user ID is serialized and added to the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // for every request, the id is used to find the user, which will be restored
  // to req.user.
  passport.deserializeUser(function(id, done) {
    // find user in database
    var user = db.get('users').find({id: id}).value()

    if(!user) {
      done({ message: 'Invalid credentials.' }, null);
    } else {
      // the object is what will be available for 'request.user'
      done(null, {id: user.id, username: user.username})
    }
  });

  // configures how to autheticate a user when they log in.

  // LocalStrategy uses username / password in the database for authentication.
  passport.use(new LocalStrategy(
    function(username, password, done) {
      // look for user in database
      var user = db.get('users').find({ username: username }).value()

      // if user not found, return error
      if(!user) {
        return done(null, false, { message: 'Invalid username & password.' });
      }

      // check if password matches
      var passwordsMatch = comparePassword(password, user.password);
      // if passowrd don't match, return error
      if(!passwordsMatch) {
        return done(null, false, { message: 'Invalid username & password.' });
      }

      //else, if username and password match, return the user
      return done(null, user)
    }
  ));
}


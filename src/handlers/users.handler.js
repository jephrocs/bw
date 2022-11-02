import {getConnection} from '../database.js';
import { addUser, getUser, updateUser } from '../repos/users.js';


export const updateUserHandler = async (req, res)=>{
    try {
      let updatedUser =  req.body;
      updateUser(req.params.id, updatedUser);
      res.json(updatedUser);
    } catch (error) {
      return res.status(500).send(error.message);
    }
}

export const deleteUser = async (req, res)=>{
const foundUser = getUser(req.params.id);
  if (!foundUser) return res.sendStatus(404);
  const newUsers = db.data.users.filter((user) => user._id !== req.params.id);
  db.data.users = newUsers;
  await db.write();

  return res.json(foundUser);
}

export const getUserHandler = (req, res)=>{
    try {
        const foundUser = getUser(req.params.id);
        if (!foundUser) return res.status(404).send({message:"User Not Found"});
        res.json(foundUser);
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
}

export const getAllUsers = (req, res)=>{
    try {
        const users = getConnection().data.users;
        res.json(users);
    } catch (error) {
        return res.status(500).send({message:error.message});
    }}

export const addUserHandler = async ( req, res)=>{
    try {
        addUser(user)
        res.json(newUser);
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
}
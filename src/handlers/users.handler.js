import {getConnection} from '../database.js';
import { addUser, getUser, updateUser } from '../repos/users.js';
import pkg from 'jsonwebtoken';
const {verify} = pkg;


export const updateUserHandler = async (req, res)=>{
    verify(req.token, 'bluewhite', (err)=>{
        if(err){
            res.sendStatus(403);
        }else {
        try {
            let updatedUser = req.body;
            if (updatedUser == {}){
                    return res.status(500).json({"message":"Request body is blank"});
                }
            updateUser(req.params.id, updatedUser);
            res.json(updatedUser);
        } catch (error) {
        return res.status(500).send(error.message);
        }
        }
})}


export const getUserHandler = (req, res)=>{
    verify(req.token, 'bluewhite', (err)=>{
        if(err){
            res.sendStatus(403);
        }else {
            try {
                const foundUser = getUser(req.params.id);
                if (!foundUser) return res.status(404).send({message:"User Not Found"});
                res.json(foundUser);
            } catch (error) {
                return res.status(500).send({message:error.message});
            }
        }

})
    
}

//Middleware
export const verifyToken = (req, res, next)=>{
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next()
    }else{
        res.sendStatus(403)
        }
                }


                
//Not needed (Admin)
export const deleteUser = async (req, res)=>{
    const dUser = getUser(req.params.id);
      if (!dUser) return res.sendStatus(404);
        deleteUser(req.params.id)
    
      return res.json(dUser);
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


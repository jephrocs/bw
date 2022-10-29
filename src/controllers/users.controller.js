import {getConnection} from '../database.js';
import shortid from 'shortid'

export const getAllUsers = (req, res)=>{
    try {
        const users = getConnection().data.users;
        res.json(users);
    } catch (error) {
        return res.status(500).send({message:error.message});
    }}

export const getUser = (req, res)=>{
    try {
        const foundUser = getConnection().data.users.find(user=>user._id===req.params.id );
        if (!foundUser) return res.sendStatus(404);
        res.json(foundUser);
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
}

export const addUser = async (req, res)=>{
    const newUser = {
        id: shortid.generate(),
        name:req.body.name
    }
    try {
        if(!req.body.name){
            return res.status(405).send({message:"no name entered"})
        }
        const db = getConnection();
        db.data.users.push(newUser);
        await db.write();
        res.json(newUser);
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
}

export const updateUser = async (req, res)=>{
    const { isActive,age,eyeColor, balance,company,phone,address,name } = req.body;
    try {
      const db = getConnection();
      const foundUser = db.data.users.find((user) => user._id === req.params.id);
      if (!foundUser) return res.sendStatus(404);

//write a function for every property for this for validation
const emptyStr=(property, foundUser)=>{
    console.log(foundUser)
    for(var i=0;i<property.length;i++){
    //    console.log(foundUser.property[i])
      if (!property[i] || property[i]==''){
         foundUser.property[i]
      }else {foundUser.property[i]=property[i]}
    }
    console.log(foundUser)
}
    emptyStr([isActive,age,eyeColor, balance,company,phone,address],foundUser);
    // if (!eyeColor || eyeColor==''){
    //     foundUser.eyeColor
    //  }else {foundUser.eyeColor=eyeColor}
    //   foundUser.age=age;
      //foundUser.name = name;
      db.data.users.map((user) => (user._id === req.params.id ? foundUser : user));
      await db.write();
  
      res.json(foundUser);
    } catch (error) {
      return res.status(500).send(error.message);
    }
}

export const deleteUser = async (req, res)=>{
  const db = getConnection();
  const foundUser = db.data.users.find((user) => user._id === req.params.id);
  if (!foundUser) return res.sendStatus(404);

  const newUsers = db.data.users.filter((user) => user._id !== req.params.id);
  db.data.users = newUsers;
  await db.write();

  return res.json(foundUser);
}

const db = getConnection();
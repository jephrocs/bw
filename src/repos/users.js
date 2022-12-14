import { getConnection } from "../database.js";

export function getUser(id){
    const db = getConnection(); 
    let user = db.data.users.find(user => user._id == id)
    return user
}
export function getUserByEmail(email){
    const db = getConnection(); 
    let user = db.data.users.find(user => user.email == email)
    return user
}
export async function addUser (user){  
    const db = getConnection(); 
    db.data.users.push(user)
    await db.write();
}

export async function updateUser(id, updatedUser){
    const db = getConnection(); 
    let uUser = getUser(id)
    if (updatedUser.name == undefined){
        uUser.name
    }else {
        !updatedUser.name.first ? uUser.name.first: uUser.name.first = updatedUser.name.first;
        !updatedUser.name.last ? uUser.name.last: uUser.name.last = updatedUser.name.last;
    }
   !updatedUser.isActive ? uUser.isActive : uUser.isActive = updatedUser.isActive;
   !updatedUser.age ? uUser.age : uUser.age = updatedUser.age;
   !updatedUser.picture ? uUser.picture : uUser.picture = updatedUser.picture;
   !updatedUser.eyeColor ? uUser.eyeColor : uUser.eyeColor = updatedUser.eyeColor;
   !updatedUser.phone ? uUser.phone : uUser.phone = updatedUser.phone;
   !updatedUser.company ? uUser.company : uUser.company = updatedUser.company;
   !updatedUser.address ? uUser.address : uUser.address = updatedUser.address;
    db.data.users.map((user) => (user._id === id ? uUser : user));
    await db.write();
}

export async function deleteUser(deletedUser){
    let dUser =  getUser(deletedUser._id);
    const newUsers = db.data.users.filter((user) => user._id == dUser._id);
    db.data.users = newUsers;
    await db.write();
}
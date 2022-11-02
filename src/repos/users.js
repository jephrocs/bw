import { getConnection } from "../database.js";

export function getUser(id){
    const db = getConnection(); 
    let user = db.data.users.find(user => user._id == id)
    if (!user)return "User Not found."
    return user
}
export function getUserByEmail(email){
    const db = getConnection(); 
    let user = db.data.users.find(user => user.email == email)
    if (!user)return "Email Not found."
    return user
}
export async function addUser (user){  
    const db = getConnection(); 
    db.data.users.push(user)
    await db.write();
}

export async function updateUser(updatedUser){
    const db = getConnection(); 
    let user = db.data.users.find(user => user._id == updatedUser._id)
    user.eyeColor = updatedUser.eyeColor;
    //ect
    db.data.users.map((user) => (user._id === updatedUser._id ? updatedUser : user));
    await db.write();
}
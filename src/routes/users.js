import {Router} from "express";
import { getAllUsers, deleteUser, getUserHandler, updateUserHandler, verifyToken } from "../handlers/users.handler.js";
const router = Router()


router.get('/users/:id', verifyToken, getUserHandler);
router.put('/users/:id',verifyToken,updateUserHandler);

//Admin Routes
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);


export default router;
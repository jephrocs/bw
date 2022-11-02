import {Router} from "express";
import { getAllUsers, deleteUser, getUserHandler, updateUserHandler } from "../handlers/users.handler.js";
const router = Router()

router.get('/users', getAllUsers);
router.get('/users/:id', getUserHandler);
router.put('/users/:id', updateUserHandler);
router.delete('/users/:id', deleteUser);


export default router;
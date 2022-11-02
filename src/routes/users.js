import {Router} from "express";
import { getAllUsers, updateUser, deleteUser, getUserHandler } from "../handlers/users.handler.js";
const router = Router()

router.get('/users', getAllUsers);
router.get('/users/:id', getUserHandler);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);


export default router;
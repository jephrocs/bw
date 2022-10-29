import {Router} from "express";
import { getAllUsers, getUser, addUser, updateUser, deleteUser } from "../controllers/users.controller.js";
const router = Router()

router.get('/users', getAllUsers);
router.get('/users/:id', getUser);
router.post('/users', addUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);


export default router;
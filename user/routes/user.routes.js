import express from "express";
const router = express.Router();
import { register, login, logout, profile } from "../controller/user.controller.js";
import { authMiddleWare } from "../middleware/authMiddleWare.js";

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/profile', authMiddleWare ,profile)


export default router;
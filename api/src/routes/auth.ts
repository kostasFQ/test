import express from "express";
import { register, login, logout } from '../controllers/authController';
import appPaths from "../paths";

const router = express.Router();

router.post(appPaths.auth.sub.register, register);
router.post(appPaths.auth.sub.login, login);
router.get(appPaths.auth.sub.logout, logout);

export default router;

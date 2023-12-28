import express from "express";
import { register, login, logout } from '../controllers/authController';
import appPaths from "../paths";

const router = express.Router();

router.post(appPaths.auth.register, register);
router.post(appPaths.auth.login, login);
router.get(appPaths.auth.logout, logout);

export default router;

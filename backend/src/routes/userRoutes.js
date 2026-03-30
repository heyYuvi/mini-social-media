import { login, register } from "../controllers/UserControllers.js";
import express from 'express';

const router = express.Router();

router.post("/user/register", register);
router.post("/user/login", login);

export default router;
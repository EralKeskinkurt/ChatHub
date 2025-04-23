import { Router } from "express";
import { login, register, tokenRefresh, me } from "../controllers/auth.controller";



const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", tokenRefresh);
router.get("/me", me)

export default router;
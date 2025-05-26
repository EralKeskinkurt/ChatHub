import { Router } from "express";
import { sendMessage } from "../controllers/message.controller";



const router = Router();

router.post("/send-message", sendMessage);


export default router;
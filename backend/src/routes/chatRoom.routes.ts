import { Router } from "express";
import { chatRoomCheck } from "../controllers/chatRoom.controller";



const router = Router();

router.post("/chat-room-check", chatRoomCheck);


export default router;
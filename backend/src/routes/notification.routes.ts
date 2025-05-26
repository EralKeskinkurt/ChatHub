import { Router } from "express";
import { sendFriendRequest, getAllNotification } from "../controllers/notification.controller";




const router = Router();

router.post("/send-friend-request", sendFriendRequest);
router.get("/get-all", getAllNotification);

export default router;
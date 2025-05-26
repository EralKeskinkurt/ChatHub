import { Router } from "express";
import { updateFriendshipStatus, getAllFriendships } from "../controllers/firends.controller";




const router = Router();

router.post("/update-request-friendship", updateFriendshipStatus);
router.get("/get-all-friendships", getAllFriendships);

export default router;
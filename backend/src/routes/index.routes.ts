import { Router } from "express";
import authRoutes from "./auth.routes";
import friendsRoutes from "./firends.routes";
import notifiationRoutes from "./notification.routes"
const router = Router();

router.use("/auth", authRoutes);
router.use("/friendship", friendsRoutes);
router.use("/notification", notifiationRoutes)
export default router;
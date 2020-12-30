import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./users.routes";
import deedRoutes from "./deeds.routes";
import roleRoutes from "./role.routes";
import uploadRoutes from "./upload.routes";
import profileRoutes from "./profile.routes";

const router = new Router();

router.use("/v1", userRoutes);
router.use("/v1", authRoutes);
router.use("/v1", roleRoutes);
router.use("/v1", deedRoutes);
router.use("/v1", uploadRoutes);
router.use("/v1", profileRoutes);

export default router;
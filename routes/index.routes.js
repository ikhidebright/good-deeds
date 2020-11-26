import { Router } from "express";
import authRoutes from "./auth.routes";
import deedRoutes from "./deeds.routes";
import roleRoutes from "./role.routes";
import uploadRoutes from "./upload.routes";

const router = new Router();

router.use("/v1", authRoutes);
router.use("/v1", roleRoutes);
router.use("/v1", deedRoutes);
router.use("/v1", uploadRoutes);

export default router;
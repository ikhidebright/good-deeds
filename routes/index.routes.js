import { Router } from "express";
import authRoutes from "./auth.routes";
import deedRoutes from "./deeds.routes";

const router = new Router();

router.use("/v1", authRoutes);
router.use("/v1", deedRoutes);

export default router;
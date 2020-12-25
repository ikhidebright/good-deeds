// import { Router } from "express";
// import gallery from "../controllers/upload";

// const upload = require("../middleware/upload-photo");

// const { imageUpload } = gallery;
// const router = new Router();

// router.post("/image", upload.single("photo"), imageUpload);

// // router.post("/image", upload.single("image"), imageUpload);

// export default router;

import express from "express";
import galleryController from "../controllers/upload";
import upload from "../middleware/upload-photo";

const { uploadImage } = galleryController;
const router = express.Router();

router.post("/image", upload.single("image"), uploadImage);

export default router;

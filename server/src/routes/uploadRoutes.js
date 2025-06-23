import { Router } from "express";
import { messageUpload } from "../config/multerConfig.js";
import uploadFile from "../controllers/uploadController.js";

const router = Router();

router.post("/", messageUpload.single("file"), uploadFile);

export default router;

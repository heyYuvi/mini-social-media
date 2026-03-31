import { addPost, deletePost, getPost } from "../controllers/PostControllers.js";
import express from "express";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/posts", protect, addPost);
router.get("/feed", protect, getPost);
router.delete("/deletePost/:id", protect, deletePost);

export default router;

import { addPost, deletePost, getFeed, getPost, toggleLike } from "../controllers/PostControllers.js";
import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { toggleFollow } from "../controllers/UserControllers.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/posts", protect, upload.single("image"), addPost);
router.get("/posts", protect, getPost);
router.delete("/posts/:id", protect, deletePost);
router.put("/posts/like/:id", protect, toggleLike);
router.post("/posts/:id/follow", protect, toggleFollow);
router.get("/feed", protect, getFeed);

export default router;

import express from "express";
import protect from "../middlewares/authMiddleware.js"
import { addComment, getComments } from "../controllers/CommentControllers.js";

const router = express.Router();

router.post("/posts/:id/comments", protect, addComment);
router.get("/posts/:id/comments", protect, getComments);

export default router;

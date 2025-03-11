import express from "express";
import { getMovieComments, createComment, deleteComment, editComment } from "../controllers/comment.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/:id", getMovieComments);
router.post("/:id", protectRoute, createComment);
router.delete("/:id", protectRoute, deleteComment);
router.patch("/:id", protectRoute, editComment);

export default router;

import express from "express";
import { addToWishlist, deleteMovieFromWishlist, fetchWishlist } from "../controllers/wishlist.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, addToWishlist);
router.get("/", protectRoute, fetchWishlist);
router.delete("/:id", protectRoute, deleteMovieFromWishlist);

export default router;

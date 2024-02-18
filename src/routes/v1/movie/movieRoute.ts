import express from "express";
import { MovieController } from "../../../controllers";
const router = express.Router();

router.get("/", MovieController.getMovies);
router.post("/add", MovieController.addMovie);

export default router;

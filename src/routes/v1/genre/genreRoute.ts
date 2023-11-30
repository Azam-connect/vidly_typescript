import express from "express";
import { GenreController } from "../../../controllers";
const router = express.Router();

router.get("/", GenreController.getGenres);
router.post("/add", GenreController.addGenre);
router.put("/modify", GenreController.modifyGenre);
router.delete("/purge/:id?", GenreController.purgeGenre);

export default router;

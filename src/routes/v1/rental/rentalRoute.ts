import express from "express";
import { RentalController } from "../../../controllers";

const router = express.Router();

router.get("/", RentalController.getRentals);
router.post("/add", RentalController.addRental);

export default router;

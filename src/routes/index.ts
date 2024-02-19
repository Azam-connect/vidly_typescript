import express from "express";

import GenreRoute from "./v1/genre/genreRoute";
import CustomerRoute from "./v1/customer/customerRoute";
import MovieRoute from "./v1/movie/movieRoute";
import RentalRoute from "./v1/rental/rentalRoute";

const router = express.Router();

router.use("/genres", GenreRoute);
router.use("/customers", CustomerRoute);
router.use("/movies", MovieRoute);
router.use("/rental", RentalRoute);

export default router;

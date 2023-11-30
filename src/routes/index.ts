import express from "express";

import GenreRoute from "./v1/genre/genreRoute";
import CustomerRoute from "./v1/customer/customerRoute";

const router = express.Router();

router.use("/genres", GenreRoute);
router.use("/customers", CustomerRoute);

export default router;

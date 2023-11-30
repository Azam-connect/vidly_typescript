import express from "../../node_modules_old/@types/express";

import GenreRoute from "./v1/genre/genreRoute";
import CustomerRoute from "./v1/customer/customerRoute";

const router = express.Router();

router.use("/genres", GenreRoute);
router.use("/customers", CustomerRoute);

export default router;

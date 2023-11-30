import express from "express";
import { CustomerController } from "../../../controllers";
const router = express.Router();

router.get("/", CustomerController.getCustomers);
router.post("/add", CustomerController.addCustomer);

export default router;

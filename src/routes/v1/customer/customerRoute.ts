import express from "../../../../node_modules_old/@types/express";
import { CustomerController } from "../../../controllers";
const router = express.Router();

router.get("/", CustomerController.getCustomers);
router.post("/add", CustomerController.addCustomer);

export default router;

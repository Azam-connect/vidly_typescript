import { NextFunction, Request, Response } from "../../../../node_modules_old/@types/express";
import { CustomerService } from "../../../services";

class CustomerController {
  async getCustomers(req: Request, res: Response, next: NextFunction) {
    try {
      await CustomerService.getCustomers(req, res, next);
    } catch (error) {
      return res
        .status(400)
        .json({ errMsg: true, message: "Something went wrong", error });
    }
  }

  async addCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      await CustomerService.addCustomer(req, res, next);
    } catch (error) {
      return res
        .status(400)
        .json({ errMsg: true, message: "Something went wrong", error });
    }
  }
}

export default new CustomerController();

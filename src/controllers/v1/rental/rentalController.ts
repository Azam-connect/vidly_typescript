import { NextFunction, Request, Response } from "express";
import { RentalService } from "../../../services";

class RentalController {
  async getRentals(req: Request, res: Response, next: NextFunction) {
    try {
      await RentalService.getRentals(req, res, next);
    } catch (error) {
      return res
        .status(400)
        .json({ errMsg: true, message: "Something went wrong", error });
    }
  }

  async addRental(req: Request, res: Response, next: NextFunction) {
    try {
      await RentalService.addRental(req, res, next);
    } catch (error) {
      return res
        .status(400)
        .json({ errMsg: true, message: "Something went wrong", error });
    }
  }
}

export default new RentalController();

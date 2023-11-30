import { Request, Response, NextFunction } from "express";
import { Customer } from "../../../models";
import Joi from "joi";
class CustomerService {
  async getCustomers(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: _id } = req.query;
      if (!_id) {
        const customers = await Customer.find({});
        return res.status(200).json({
          errMsg: false,
          message: "Customer retrived",
          result: customers,
        });
      }
      const customer = await Customer.findById(_id);
      if (!customer) {
        return res.status(404).json({
          errMsg: false,
          message: "Customer not found",
          result: customer,
        });
      }
      return res.status(200).json({
        errMsg: false,
        message: "Customer retrived",
        result: customer,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ errMsg: true, message: `Internal server error:: ${error}` });
    }
  }

  async addCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const { value, error } = Joi.object({
        name: Joi.string().min(3).required(),
        phone: Joi.number().min(1000000000).max(999999999999999).required(),
        isGold: Joi.boolean().allow(null),
      }).validate(req.body);

      if (error) {
        const validationErrorMessages = error.details.map((e) => e.message);
        return res.status(400).json({
          errMsg: true,
          validationError: validationErrorMessages,
        });
      }

      const { name, phone, isGold = false } = value;

      const customer = await Customer.create({
        name,
        phone: parseInt(phone),
        isGold,
      });
      if (!customer) {
        return res
          .status(400)
          .json({ errMsg: true, message: "Something went wrong" });
      }
      return res
        .status(200)
        .json({ errMsg: false, message: "Customer saved", result: customer });
    } catch (error) {
      return res
        .status(500)
        .json({ errMsg: true, message: `Internal server error:: ${error}` });
    }
  }

  async modifyCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const { value: paramValue, error: paramError } = Joi.object({
        id: Joi.string().min(24).max(24),
      }).validate(req.params);

      if (paramError) {
        const validationErrorMessages = paramError.details.map(
          (e) => e.message
        );
        return res.status(400).json({
          errMsg: true,
          validationError: validationErrorMessages,
        });
      }
      const { value, error } = Joi.object({
        name: Joi.string().min(3),
        phone: Joi.number().min(1000000000).max(999999999999999),
        isGold: Joi.boolean(),
      }).validate(req.body);

      if (error) {
        const validationErrorMessages = error.details.map((e) => e.message);
        return res.status(400).json({
          errMsg: true,
          validationError: validationErrorMessages,
        });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ errMsg: true, message: `Internal server error:: ${error}` });
    }
  }

  async removeCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const { value: paramValue, error: paramError } = Joi.object({
        id: Joi.string().min(24).max(24),
      }).validate(req.params);
    } catch (error) {
      return res
        .status(500)
        .json({ errMsg: true, message: `Internal server error:: ${error}` });
    }
  }
}

export default new CustomerService();

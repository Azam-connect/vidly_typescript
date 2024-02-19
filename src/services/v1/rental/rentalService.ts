import { NextFunction, Request, Response } from "express";
import { Customer, Movie, Rental } from "../../../models";
import Joi from "joi";

class RentalService {
  async getRentals(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: _id } = req.query;
      if (!_id) {
        const rentals = await Rental.find({});
        return res.status(200).json({
          errMsg: false,
          message: "Rental fetched",
          result: rentals,
        });
      }
      const rental = await Rental.findById(_id);
      if (!rental) {
        return res.status(404).json({
          errMsg: true,
          message: "No rental found with the given ID",
        });
      }
      return res
        .status(200)
        .json({ errMsg: false, message: "Rental fetched", result: rental });
    } catch (error) {
      return res.status(500).json({
        errMsg: true,
        message: `Internal server error:: ${error}`,
      });
    }
  }

  async addRental(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = Joi.object({
        customerId: Joi.required(),
        movieId: Joi.required(),
      }).validate(req.body);
      if (error) {
        const validationErrorMessages = error.details.map((e) => e.message);
        return res.status(400).json({
          errMsg: true,
          validationError: validationErrorMessages,
        });
      }
      const { customerId, movieId } = value;
      const customer = await Customer.findById(customerId);
      if (!customer) return res.status(400).send("Invalid customer.");

      const movie = await Movie.findById(movieId);
      if (!movie) return res.status(400).send("Invalid movie.");

      if (movie.numberInStock === 0)
        return res.status(400).send("Movie not in stock.");

      let rental = await Rental.create({
        customer: {
          _id: customer._id,
          name: customer.name,
          phone: customer.phone,
        },
        movie: {
          _id: movie._id,
          title: movie.title,
          dailyRentalRate: movie.dailyRentalRate,
        },
      });
      if (rental) {
        movie.numberInStock = movie.numberInStock - 1;
        await movie.save();
        return res.status(201).json({ errMsg: false, message: "Rental added" });
      }
    } catch (error) {
      return res.status(500).json({
        errMsg: true,
        message: `Internal server error:: ${error}`,
      });
    }
  }
}
export default new RentalService();

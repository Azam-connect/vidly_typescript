import { NextFunction, Request, Response } from "express";
import { Genre, Movie } from "../../../models";
import Joi from "joi";

class MovieService {
  async getMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: _id } = req.query;
      if (!_id) {
        const movies = await Movie.find({});
        return res.status(200).json({
          errMsg: false,
          message: "Movie fetched",
          result: movies,
        });
      }
      const movie = await Movie.findById(_id);
      if (!movie) {
        return res.status(404).json({
          errMsg: true,
          message: "No movie found with the given ID",
        });
      }
      return res
        .status(200)
        .json({ errMsg: false, message: "Movie fetched", result: movie });
    } catch (error) {
      return res.status(500).json({
        errMsg: true,
        message: `Internal server error:: ${error}`,
      });
    }
  }

  async addMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
      }).validate(req.body);

      if (error) {
        const validationErrorMessages = error.details.map((e) => e.message);
        return res.status(400).json({
          errMsg: true,
          validationError: validationErrorMessages,
        });
      }
      const { title, genreId, numberInStock, dailyRentalRate } = value;
      const foundGenre = await Genre.findById({ _id: genreId });
      if (!foundGenre) {
        return res
          .status(400)
          .json({ errMsg: true, message: "Genre not found" });
      }
      const saveMovie = await Movie.create({
        title,
        genre: { _id: foundGenre._id, name: foundGenre.name },
        numberInStock,
        dailyRentalRate,
      });
      return res.status(201).json({ errMsg: false, message: "Movie added" });
    } catch (error) {
      return res.status(500).json({
        errMsg: true,
        message: `Internal server error:: ${error}`,
      });
    }
  }
}

export default new MovieService();

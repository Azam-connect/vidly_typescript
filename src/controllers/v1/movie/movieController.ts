import { NextFunction, Request, Response } from "express";
import { MovieService } from "../../../services";

class MovieController {
  async getMovies(req: Request, res: Response, next: NextFunction) {
    try {
      await MovieService.getMovies(req, res, next);
    } catch (error) {
      return res
        .status(400)
        .json({ errMsg: true, message: "Something went wrong", error });
    }
  }

  async addMovie(req: Request, res: Response, next: NextFunction) {
    try {
      await MovieService.addMovie(req, res, next);
    } catch (error) {
      return res
        .status(400)
        .json({ errMsg: true, message: "Something went wrong", error });
    }
  }
}
export default new MovieController();

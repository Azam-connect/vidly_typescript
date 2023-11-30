import { Request, Response, NextFunction } from "express";
import { GenreService } from "../../../services";
class GenreContoller {
  async getGenres(req: Request, res: Response, next: NextFunction) {
    try {
      await GenreService.getGenres(req, res, next);
    } catch (error) {
      return res
        .status(400)
        .json({ errMsg: true, message: "Something went wrong", error });
    }
  }

  async addGenre(req: Request, res: Response, next: NextFunction) {
    try {
      await GenreService.addGenre(req, res, next);
    } catch (error) {
      return res
        .status(400)
        .json({ errMsg: true, message: "Something went wrong", error });
    }
  }

  async modifyGenre(req: Request, res: Response, next: NextFunction) {
    try {
      await GenreService.modifyGenre(req, res, next);
    } catch (error) {
      return res
        .status(400)
        .json({ errMsg: true, message: "Something went wrong", error });
    }
  }

  async purgeGenre(req: Request, res: Response, next: NextFunction) {
    try {
      await GenreService.purgeGenre(req, res, next);
    } catch (error) {
      return res
        .status(400)
        .json({ errMsg: true, message: "Something went wrong", error });
    }
  }
}

export default new GenreContoller();

import { Request, Response, NextFunction } from "../../../../node_modules_old/@types/express";
import { Genre } from "../../../models";
import Joi from "../../../../node_modules_old/joi/lib";
class GenreService {
  async getGenres(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: _id } = req.query;
      if (!_id) {
        const genres = await Genre.find({});
        return res
          .status(200)
          .json({ errMsg: false, message: "Genre fetched", result: genres });
      }
      const genre = await Genre.findById(_id);
      if (!genre) {
        return res.status(404).json({
          errMsg: true,
          message: "No genre found with the given ID",
        });
      }
      return res
        .status(200)
        .json({ errMsg: false, message: "Genre fetched", result: genre });
    } catch (error) {
      return res
        .status(500)
        .json({ errMsg: true, message: `Internal server error:: ${error}` });
    }
  }
  async addGenre(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = Joi.object({
        name: Joi.string().min(3).required(),
      }).validate(req.body);

      if (error) {
        const validationErrorMessages = error.details.map((e) => e.message);
        return res.status(400).json({
          errMsg: true,
          validationError: validationErrorMessages,
        });
      }

      const { name } = value;
      const foundGenre = await Genre.findOne({
        name: { $regex: name, $options: "i" },
      });

      if (foundGenre) {
        return res
          .status(400)
          .json({ errMsg: true, message: "Given genre already exists" });
      }

      const newGenre = {
        name: `${name.charAt(0).toUpperCase()}${name.slice(1)}`,
      };

      const genres = await Genre.create(newGenre);

      return res
        .status(200)
        .json({ errMsg: false, message: "Genre added", result: genres });
    } catch (error) {
      return res
        .status(500)
        .json({ errMsg: true, message: `Internal server error: ${error}` });
    }
  }
  async modifyGenre(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = Joi.object({
        id: Joi.string().required().min(24).max(24),
        name: Joi.string().required().min(3),
      }).validate(req.body);
      if (error) {
        const validationErrorMessages = error.details.map((e) => e.message);
        return res
          .status(400)
          .json({ errMsg: true, validationError: validationErrorMessages });
      }

      const { id, name } = value;
      const foundGenre = await Genre.findById(id);
      if (!foundGenre) {
        return res
          .status(404)
          .json({ errMsg: false, message: "Genre not found" });
      }

      foundGenre.name = `${name.charAt(0).toUpperCase()}${name
        .slice(1)
        .toLowerCase()}`;

      foundGenre.save();

      return res.status(200).json({
        errMsg: false,
        message: "Genre modified",
        result: foundGenre,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ errMsg: true, message: `Internal server error: ${error}` });
    }
  }
  async purgeGenre(req: Request, res: Response, next: NextFunction) {
    try {
      const { id = null } = req.params;
      if (!id || isNaN(parseInt(id))) {
        return res
          .status(400)
          .json({ errMsg: true, message: "Invalid ID given" });
      }
      const foundGenre = await Genre.findByIdAndDelete(id);

      return res.status(200).json({ errMsg: false, message: "Genre removed" });
    } catch (error) {
      return res
        .status(500)
        .json({ errMsg: true, message: `Internal server error: ${error}` });
    }
  }
}

export default new GenreService();

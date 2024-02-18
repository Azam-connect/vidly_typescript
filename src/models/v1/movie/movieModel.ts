import mongoose from "mongoose";
import { VidlyDB } from "../../../config/dbConfig";
import { genreSchema } from "../genre/genreModel";
import Joi from "joi";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, minlength: 5, maxlenght: 255 },
    genre: {
      type: genreSchema,
      required: true,
    },
    numberInStock: { type: Number, trim: true, min: 0, max: 255, default: 0 },
    dailyRentalRate: { type: Number, trim: true, min: 0, max: 255, default: 0 },
  },
  { timestamps: true }
);

const Movie = VidlyDB.model("movies", movieSchema, "Movies");

export { Movie };

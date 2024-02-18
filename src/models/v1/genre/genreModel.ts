import mongoose from "mongoose";
import { VidlyDB } from "../../../config/dbConfig";

const genreSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, min: 3 },
  },
  { timestamps: true }
);

const Genre = VidlyDB.model("genres", genreSchema, "Genres");

export { Genre, genreSchema };

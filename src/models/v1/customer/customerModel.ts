import mongooes from "mongoose";
import { VidlyDB } from "../../../config/dbConfig";

const customerSchema = new mongooes.Schema(
  {
    name: { type: String, trim: true, min: 3, required: true },
    phone: {
      type: Number,
      trim: true,
      min: 1000000000,
      max: 999999999999999,
      require: true,
    },
    isGold: { type: Boolean, trim: true, default: false },
  },
  { timestamps: true }
);

const Customer = VidlyDB.model("customers", customerSchema, "Customers");

export { Customer };

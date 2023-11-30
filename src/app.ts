import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import helmet from "helmet";
import AppRoute from "./routes";
import log from "./utils/debugger";

const app = express();

app.use(helmet());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use("/api", AppRoute);

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  log(`Listening server to PORT ${port}`);
});

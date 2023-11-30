import express from "../node_modules_old/@types/express";
import dotenv from "../node_modules_old/dotenv/lib/main";
dotenv.config();
import bodyParser from "../node_modules_old/@types/body-parser";
import helmet from "../node_modules_old/helmet/index.cjs";
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

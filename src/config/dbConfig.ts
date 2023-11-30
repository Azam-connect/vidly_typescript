import mongoose, { Connection, ConnectOptions } from "mongoose";
import log from "../utils/debugger";

const connectDatabase = (): Connection => {
  const dbHost = process.env.DB_HOST;

  if (!dbHost) {
    throw new Error("DB_HOST environment variable is not set");
  }

  const db: Connection = mongoose.createConnection(dbHost, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  } as ConnectOptions); // Use mongoose.ConnectOptions here

  db.on("error", function (this: Connection, error: Error) {
    log(`MongoDB :: connection ${this.name} ${JSON.stringify(error)}`);
    db.close().catch(() =>
      log(`MongoDB :: failed to close connection ${this.name}`)
    );
  });

  db.on("connected", function (this: Connection) {
    mongoose.set(
      "debug",
      function (
        this: Connection,
        col: string,
        method: string,
        query: unknown,
        doc: unknown
      ) {
        log(
          `MongoDB :: ${this.name} ${col}.${method}(${JSON.stringify(
            query
          )},${JSON.stringify(doc)})`
        );
      }
    );

    log(`MongoDB :: connected ${this.name}`);
  });

  db.on("disconnected", function (this: Connection) {
    log(`MongoDB :: disconnected ${this.name}`);
  });

  return db;
};

const VidlyDB: Connection = connectDatabase();

export { VidlyDB };

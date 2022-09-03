import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import { checkDbConnection, httpLogger, useCors } from "./src/middlewares";
import { db, initateDB } from "./src/database";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(httpLogger());
app.use(helmet());
app.use(useCors());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server.")
});

initateDB();
app.use(checkDbConnection());

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

process.on("SIGINT", function () {
  db.close(function () {
    console.log("Mongoose connection disconnected through app termination");
    process.exit(1);
  });
});

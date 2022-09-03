import mongoose from "mongoose";

export let db: mongoose.Connection;
try {
  db = mongoose.connection;
} catch (error) {
  console.log("error db conn", error);
}

export const initateDB = () => {
  try {
    const user: string | undefined = process.env.DB_USER;
    const pass: string | undefined = process.env.DB_PASS;
    const host: string | undefined = process.env.DB_HOST;
    const port: string | number | undefined = process.env.DB_PORT;
    if (user && pass && host && port) {
      const url = `mongodb://${host}:${port}`;
      mongoose.connect(
        url,
        {
          dbName: "portfolio",
          autoIndex: true,
          user: user,
          pass: pass,
        },
        (error) => {
          if (error) console.log("Mongo Error =>", error?.message);
        },
      );
      db.once("open", function () {
        console.log("Connected successfully");
      });
    } else {
      console.log("Failed No ENV", process.env);
    }
  } catch (error) {
    db.on("error", () => console.log("error connecting to DB"));
  }
};

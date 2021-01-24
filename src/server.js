import express, { json, urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import db from "./config/config";
import api from "./routes/index";

dotenv.config();

const app = express();
// eslint-disable-next-line radix
const port = parseInt(process.env.PORT) || 3000;

db.then(() => {
  app.use(json(), urlencoded({ extended: false }), morgan("dev"), cors());

  app.get("/api/v1", (req, res) => res.send({ message: "Hello, Welcome to Pencil Backend app" }));
  app.use("/api/v1", api);
  app.listen(port, () => console.log(`App listing on port ${port}`));
}).catch((err) => {
  console.log(err.message);
});

export default app;

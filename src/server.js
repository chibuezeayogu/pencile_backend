import express, { json, urlencoded } from 'express';
import cors from 'cors';

const app = express();
const port = parseInt(process.env.Port) || 3000;

app.use(
  json(),
  urlencoded({ extended: false }),
  cors()
);

app.get("/api/v1", (req, res) => res.send({ message: "Hello, Welcome to Pencil Backend app" }));
app.listen(port, () => console.log(`App listing on port ${port}`));

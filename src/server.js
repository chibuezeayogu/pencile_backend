import express, { json, urlencoded } from 'express';
import cors from 'cors';
import api from './routes/index';

const app = express();
const port = parseInt(process.env.Port) || 3000;

app.use(
  json(),
  urlencoded({ extended: false }),
  cors()
);

app.get("/api/v1", (req, res) => res.send("Hello, Welcome to this app"));
app.listen(port, () => console.log(`App listing on port ${port}`));

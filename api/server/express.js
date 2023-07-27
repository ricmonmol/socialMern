import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import devBundle from "./devBundle";
import path from "path";
import Template from "../template";

const app = express();
const CURRENT_WORKING_DIR = process.cwd();

devBundle.compile(app); //Comment for production, developing only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use("/", userRoutes, authRoutes);
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

app.get("/", (req, res) => {
  res.status(200).send(Template());
});

export default app;

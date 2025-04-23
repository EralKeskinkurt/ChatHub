import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import routes from "./routes/index.routes";
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(routes)



export default app;

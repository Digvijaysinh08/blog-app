import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter  from "./routes/userRouter.js";
import blogRouter  from "./routes/blogRouter.js";
import fileUpload from "express-fileupload";

const app = express();

dotenv.config({
    path: "./config/config.env",
});

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/",
}))

app.get("/", (req, res) => {
    return res
      .status(200)
      .send("Welcome to Bolg App API");
  });


app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);

connectDB();

app.use(errorMiddleware);

export default app;
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import globalErrorHandler from "./controllers/errorController";
import AppError from "./utils/appError";
import boardRouter from "./routes/boardRouter";
import taskRouter from "./routes/taskRouter";

const app = express();

//1)GLOBAL MIDDLEWARES
app.use(cors());
//dev logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Body parser, reading data from the body into req.body
app.use(
  express.json({
    limit: "10kb",
  })
);

//2) ROUTES
app.use("/api/v1/boards", boardRouter);
app.use("/api/v1/tasks", taskRouter);

app.all("/*splat", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
//3)START THE SERVER
export default app;

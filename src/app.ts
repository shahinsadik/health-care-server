import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import status from "http-status";
import globalErrorHandeler from "./app/middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";
const app: Application = express();
app.use(cors());

//perser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Health Care Server is running!",
  });
});

app.use("/api/v1", router);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(status.NOT_FOUND).send({
    success: false,
    message: "Api Not Found",
    error: {
      path: req.originalUrl,
      method: req.method,
      message: "Your request path is not found",
    },
  });
});
app.use(globalErrorHandeler);
export default app;

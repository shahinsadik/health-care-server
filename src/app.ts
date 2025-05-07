import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/User/user.routes";

const app: Application = express();
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Health Care Server is running!",
  });
});

app.use("/api/v1/user", UserRoutes);
export default app;

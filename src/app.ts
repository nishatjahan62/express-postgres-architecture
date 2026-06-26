import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { pool } from "./db";
import { userRoutes } from "./modules/users/user.route";
import { profileRoutes } from "./modules/profile/profile.route";
import { authRoutes } from "./modules/auth/auth.routes";

 export const app: Application = express();


// Middlewares
app.use(express.text()); // plain text
app.use(express.json()); // json format
app.use(express.urlencoded({ extended: true })); // extended means it will take the nested object also

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express Server",
    Author: "Nishat Jahan",
  });
});


// routes:
app.use("/api/users",userRoutes)
app.use("/api/profiles",profileRoutes)
app.use("/api/auth",authRoutes)








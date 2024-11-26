import express, { Express } from "express";
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", bookRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

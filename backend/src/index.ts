import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testDbConnection } from "./database/db.js";
import router from "./routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/forces", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await testDbConnection(); 
});
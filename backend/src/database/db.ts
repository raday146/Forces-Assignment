import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Force } from "./force.entity.js";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL!,
  synchronize:false,
  logging: false,
  entities: [Force],
  subscribers: [],
  migrations: [],
});

export const testDbConnection = async () => {
  try {
    await AppDataSource.initialize();
  } catch (error) {
    process.exit(1);
  }
};

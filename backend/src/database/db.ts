import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL!,
  logging: false,
  entities: [],
  subscribers: [],
  migrations: [],
});

export const testDbConnection = async () => {
  try {
    await AppDataSource.initialize();
    console.log("✅ TypeORM DataSource has been initialized successfully!");
  } catch (error) {
    console.error("❌ Error during TypeORM DataSource initialization:", error);
    process.exit(1);
  }
};
import { defineConfig } from "@prisma/config";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  datasource: {
    // provider: "postgresql" | "mysql" | "sqlite" | etc
       url: process.env.DATABASE_URL!, // ensure DATABASE_URL is set in .env

  },
});

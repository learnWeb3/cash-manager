import dotenv from "dotenv";
import { join } from "path";

const isProd = process.env.NODE_ENV === "production";

if (!isProd) {
  dotenv.config({
    path: join(process.cwd(), "..", ".server.env.development"),
  });
}

export interface Environment {
  NODE_ENV: "local" | "development" | "production";
  PORT: number;
  CLIENT_URL: string;
  SESSION_EXPIRE: string;
  SESSION_SECRET: string;
  DATABASE_URI: string;
  GOOGLE_PROJECT_ID: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_PRIVATE_KEY: string;
  GOOGLE_BUCKET_NAME: string;
  PATH_PREFIX: string;
}

const environment: Environment = {
  NODE_ENV: process.env.NODE_ENV as Environment["NODE_ENV"],
  PORT: parseInt(process.env.PORT) as Environment["PORT"],
  CLIENT_URL: process.env.CLIENT_URL as Environment["CLIENT_URL"],
  SESSION_EXPIRE: process.env.SESSION_EXPIRE as Environment["SESSION_EXPIRE"],
  SESSION_SECRET: process.env.SESSION_SECRET as Environment["SESSION_SECRET"],
  DATABASE_URI: process.env.DATABASE_URI as Environment["DATABASE_URI"],
  GOOGLE_PROJECT_ID: process.env
    .GOOGLE_PROJECT_ID as Environment["GOOGLE_PROJECT_ID"],
  GOOGLE_CLIENT_ID: process.env
    .GOOGLE_CLIENT_ID as Environment["GOOGLE_CLIENT_ID"],
  GOOGLE_PRIVATE_KEY: process.env
    .GOOGLE_PRIVATE_KEY as Environment["GOOGLE_PRIVATE_KEY"],
  GOOGLE_BUCKET_NAME: process.env
    .GOOGLE_BUCKET_NAME as Environment["GOOGLE_BUCKET_NAME"],
  PATH_PREFIX: (process.env.PATH_PREFIX as Environment["PATH_PREFIX"]) || "",
};

export default environment;

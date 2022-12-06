import dotenv from 'dotenv'
import { join } from 'path';

const isProd = process.env.NODE_ENV === "production";

if (!isProd) {
    dotenv.config({
        path: join(process.cwd(), '..', '.server.env.development')
    })
}

export interface Environment {
    NODE_ENV: "local" | "development" | "production";
    PORT: number;
    CLIENT_URL: string;
    SESSION_EXPIRE: string;
    SESSION_SECRET: string;
    DATABASE_URI: string;
}

const environment: Environment = {
    NODE_ENV: process.env.NODE_ENV as Environment["NODE_ENV"],
    PORT: parseInt(process.env.PORT) as Environment["PORT"],
    CLIENT_URL: process.env.CLIENT_URL as Environment["CLIENT_URL"],
    SESSION_EXPIRE: process.env.SESSION_EXPIRE as Environment["SESSION_EXPIRE"],
    SESSION_SECRET: process.env.SESSION_SECRET as Environment["SESSION_SECRET"],
    DATABASE_URI: process.env.DATABASE_URI as Environment["DATABASE_URI"]
};

export default environment;  
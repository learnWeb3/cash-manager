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
    MONGO_HOST: string;
    MONGO_USERNAME: string;
    MONGO_PASSWORD: string;
    MONGO_DATABASE: string;
    // MONGO_REPLICA_NAME: string;
    SESSION_EXPIRE: string;
    SESSION_SECRET: string;
}

const environment: Environment = {
    NODE_ENV: process.env.NODE_ENV as Environment["NODE_ENV"],
    PORT: parseInt(process.env.PORT) as Environment["PORT"],
    MONGO_HOST: process.env.MONGO_HOST as Environment["MONGO_HOST"],
    CLIENT_URL: process.env.CLIENT_URL as Environment["CLIENT_URL"],
    MONGO_USERNAME: process.env.MONGO_INITDB_ROOT_USERNAME as Environment["MONGO_USERNAME"],
    MONGO_PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD as Environment["MONGO_PASSWORD"],
    MONGO_DATABASE: process.env.MONGO_INITDB_DATABASE as Environment["MONGO_DATABASE"],
    // MONGO_REPLICA_NAME: process.env.MONGO_REPLICA_NAME as Environment["MONGO_REPLICA_NAME"],
    SESSION_EXPIRE: process.env.SESSION_EXPIRE as Environment["SESSION_EXPIRE"],
    SESSION_SECRET: process.env.SESSION_SECRET as Environment["SESSION_SECRET"]
};

export default environment;  
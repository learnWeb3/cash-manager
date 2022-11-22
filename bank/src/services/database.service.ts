import mongoose from 'mongoose';
import { env } from './env.service';

export class Db {
    static async connect() {
        return await mongoose.connect(`mongodb://${env.DATABASE_HOST}:${env.DATABASE_PORT}/${env.DATABASE_NAME}`)
    }
}
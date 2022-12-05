import mongoose from 'mongoose';
import { env } from './env.service';

export class Db {
    static async connect() {
        const urlString: string = `mongodb://${env.DATABASE_USERNAME}:${env.DATABASE_PASSWORD}@${env.DATABASE_HOST}:${env.DATABASE_PORT}`
        return await mongoose.connect(urlString)
    }
}
import mongoose from 'mongoose';
import { env } from './env.service';

export class Db {
    static async connect() {
        return await mongoose.connect(env.DATABASE_URI)
    }
}
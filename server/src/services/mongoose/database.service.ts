import mongoose from 'mongoose';
import { sleep } from '../../utils/sleep';
import env from '../env.service';

var connRetry = 5;

export const connectDatabase = async function (): Promise<typeof mongoose> {
    try {
        return await mongoose.connect(env.DATABASE_URI);
    } catch (err) {
        console.error('[MongoDB] Connect Error', err);
        if (--connRetry) {
            await sleep(5000);
            return await connectDatabase()
        }
    }
}

mongoose.connection.once('open', () =>
    console.log("[MongoDB] Database successfully connected")
);

mongoose.connection.on('error', () =>
    console.error('[MongoDB] Failed to connect on the database')
);
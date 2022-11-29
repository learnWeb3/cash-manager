import mongoose, { ConnectOptions } from 'mongoose';
import { sleep } from '../../utils/sleep';
import env from '../env.service';

const mongoURI = `mongodb://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@${env.MONGO_HOST}:27017`;

var connRetry = 5;

export const connectDatabase = async function (): Promise<typeof mongoose> {
    try {
        return await mongoose.connect(mongoURI, <ConnectOptions>{
            serverSelectionTimeoutMS: 10000,
            ssl: false,
            useNewUrlParser: true,
            dbName: env.MONGO_DATABASE,
            // replicaSet: env.MONGO_REPLICA_NAME,
            directConnection: true
        });
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
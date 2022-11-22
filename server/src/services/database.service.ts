import mongoose, { ConnectOptions, mongo } from 'mongoose';

const mongoURI = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:27017`;

export const connectDatabase = async function() {
    try {
        await mongoose.connect(mongoURI, <ConnectOptions>{
            serverSelectionTimeoutMS: 2000,
            ssl: false,
            useNewUrlParser: true,
            dbName: process.env.MONGO_INITDB_DATABASE,
            replicaSet: process.env.MONGO_REPLICA_SET_NAME,
            directConnection: true
        });
    } catch(err) {
        console.error('[MongoDB] Connect Error', err);
    }
}

mongoose.connection.once('open', () =>
    console.log("[MongoDB] Database successfully connected")
);

mongoose.connection.on('error', () =>
    console.error('[MongoDB] Failed to connect on the database')
);
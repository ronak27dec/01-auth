import mongoose from 'mongoose';
import { config } from './config.js';

export async function connectToMongoDB() {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log('You successfully connected to MongoDB!');
        return mongoose;
    } catch (err) {
        console.dir(err);
    }
}

export async function disconnectFromMongoDB() {
    await mongoose.connection.close();
}

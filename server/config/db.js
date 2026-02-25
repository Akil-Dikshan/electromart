import mongoose, { Error } from 'mongoose';

//using async bacause connecting to a db is a slow operation
const connectDb = async () => { 
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.error(`MongoDB connecting error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDb;
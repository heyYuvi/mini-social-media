import mongoose from 'mongoose';

const mongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Failed to connect to the Database: ${error}`);
        process.exit(1);
    }
}

export default mongoDB;
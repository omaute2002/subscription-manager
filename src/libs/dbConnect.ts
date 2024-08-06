import mongoose from 'mongoose';

type ConnetionObject = {
    isConnected?: number;
}

const connection: ConnetionObject = {};

async function dbConnect(): Promise<void>{
    if(connection.isConnected){
        console.log(`Database already Connected`);
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {})
        connection.isConnected = db.connections[0].readyState;
        console.log("Database Connected");
        
    } catch (error) {
        console.log(`error while connecting to the database, ${error}`)
        process.exit(1);        
    }
}

export default dbConnect;
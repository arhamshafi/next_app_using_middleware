import mongoose from "mongoose";

const MONGOURL = process.env.MONGOURL || "mongodb://localhost:27017/usingmiddleware";

if (!MONGOURL) {
    throw new Error("Please Define MongoUrl in .ENV variable..");
}

let cached = global.mongoose || { conn: null, promise: null };

global.mongoose = cached;

async function ConnectDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        const opts = { bufferCommands: false };
        cached.promise = mongoose.connect(MONGOURL, opts);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default ConnectDB;

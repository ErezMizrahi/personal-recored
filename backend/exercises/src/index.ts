import mongoose from "mongoose";
import { app } from "./app";
import dotenv from 'dotenv'
import searchService from "./services/elasticsearch";
dotenv.config()


const start = async () => {
    try {
        if(!process.env.MONGO_URI) throw new Error('MONGO_URI must be defiend');

        await mongoose.connect(process.env.MONGO_URI);
        console.log('connected to mongodb');

        await searchService.checkConnection();

        app.listen(process.env.PORT, () => {
            console.log(`listening on port ${process.env.PORT}`);
        });
    } catch (e) {
        console.error(e)
    }
}


start();
import mongoose from "mongoose";
import { app } from "./app";
import dotenv from 'dotenv'
import searchService from "./services/elasticsearch";
dotenv.config()


const start = async () => {
    try {
        if(!process.env.ELASTIC_URL) throw new Error('ELASTIC_URL must be defiend');
        if(!process.env.ELASTIC_INDEX) throw new Error('ELASTIC_INDEX must be defiend');
        if(!process.env.ELASTIC_TYPE) throw new Error('ELASTIC_TYPE must be defiend');

        await searchService.checkConnection();

        app.listen(process.env.PORT, () => {
            console.log(`listening on port ${process.env.PORT}`);
        });
    } catch (e) {
        console.error(e)
    }
}


start();
import mongoose from "mongoose";
import { app } from "./app";
import dotenv from 'dotenv'
import { rabbitMqWrapper } from "./mq.wrapper";
dotenv.config()


const start = async () => {
    console.log('starting up');
    try {
        if(!process.env.JWT_KEY) throw new Error('JWT_KEY must be defiend');
        if(!process.env.MONGO_URI) throw new Error('MONGO_URI must be defiend');
        if(!process.env.RABBIT_MQ_CONNECTION) throw new Error('RABBIT_MQ_CONNECTION be defiend');

        await mongoose.connect(process.env.MONGO_URI);
        console.log('connected to mongodb');

        await rabbitMqWrapper.connect(process.env.RABBIT_MQ_CONNECTION);

        process.on('SIGINT', async () =>  {
            await rabbitMqWrapper.closeConnections();
            process.exit(0);
        } );
        process.on('SIGTERM', async () =>  {
            await rabbitMqWrapper.closeConnections();
            process.exit(0);
        });

        app.listen(4000, () => {
            console.log('listening on port 4000');
        });
    } catch (e) {
        console.error(e)
    }
}


start();
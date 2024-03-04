import mongoose from "mongoose";
import { app } from "./app";
import dotenv from 'dotenv'
import { rabbitMqWrapper } from "./amqp/mq.wrapper";
import { UserCreatedListener } from "./events/listeners/user.created";
dotenv.config()


const start = async () => {
    try {
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

        app.listen(process.env.PORT, () => {
            console.log(`listening on port ${process.env.PORT}`);

            //queue listeners
            console.log('adding listeners')
            new UserCreatedListener(rabbitMqWrapper.channel).listen();
        });
    } catch (e) {
        console.error(e)
    }
}


start();
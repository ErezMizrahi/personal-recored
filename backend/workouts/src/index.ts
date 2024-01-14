import mongoose from "mongoose";
import { app } from "./app";
import dotenv from 'dotenv'
import { rabbitMqWrapper } from "./amqp/mq.wrapper";
import { UserCreatedListener } from "./events/listeners/user.created";
dotenv.config()


const start = async () => {
    console.log('starting up');
    try {
        if(!process.env.MONGO_URI) throw new Error('MONGO_URI must be defiend');
        if(!process.env.RABBIT_MQ_CONNECTION) throw new Error('RABBIT_MQ_CONNECTION be defiend');



        await mongoose.connect(process.env.MONGO_URI);
        console.log('connected to mongodb');

        await rabbitMqWrapper.connect(process.env.RABBIT_MQ_CONNECTION);

        process.on('SIGINT', () =>  closeConnections());
        process.on('SIGTERM', () => closeConnections());

        app.listen(4001, () => {
            console.log('listening on port 4001');

            //queue listeners
            console.log('adding listeners')
            new UserCreatedListener(rabbitMqWrapper.channel).listen();
        });
    } catch (e) {
        console.error(e)
    }
}

const closeConnections = () => {
    rabbitMqWrapper.channel.close();
    rabbitMqWrapper.conenction.close();
}


start();
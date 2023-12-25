import { Channel } from "amqplib";
import { Queues } from "../types/queues";
import { Event } from "../types/event";

export abstract class Publisher <T extends Event> {
    abstract readonly queue: T['queue'];

    constructor(private readonly channel: Channel) {}

    publish(data: T['data']){
        try {
            this.channel.sendToQueue(this.queue, Buffer.from(data));
            console.log('EVENT PUBLISHED TO QUEUE:', this.queue);

        } catch(e) {
            console.error(e);
        }
    }
}
import { Channel } from "amqplib";
import { Event } from "../types/event";

export abstract class Publisher <T extends Event> {
    abstract readonly queue: T['queue'];

    constructor(protected readonly channel: Channel) {}

    publish(data: T['data']){
        try {
            this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(data)));
            console.log('EVENT PUBLISHED TO QUEUE:', this.queue);

        } catch(e) {
            console.error(e);
        }
    }
}
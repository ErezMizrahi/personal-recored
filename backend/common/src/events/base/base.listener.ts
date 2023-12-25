import { Channel, ConsumeMessage, Message } from "amqplib";
import { Event } from "../types/event";

export abstract class Listener <T extends Event> {
    abstract readonly queue: T['queue'];
    abstract onMessage(data: T['data'], msg: ConsumeMessage | null): void;

    constructor(protected channel: Channel, protected ackWait: number = 5 * 1000) {}

    listen() {
        this.channel.assertQueue(this.queue, { durable: true });
        this.channel.consume(this.queue, (msg: ConsumeMessage | null) => {
            if(msg) {
                console.log(`message recived ${msg.fields.routingKey}`);
                
                const parsedMessage = this.parseMessage(msg);
                this.onMessage(parsedMessage, msg);
            }
        })
    }

    parseMessage(msg: ConsumeMessage) {
        const content = msg.content.toString();
        console.log('content', content);
        return JSON.parse(content);
    }
}
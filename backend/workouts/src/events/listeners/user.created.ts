import { Listener, Queues, UserCreatedEvent } from "@erezmiz-pr/pr-common";
import { ConsumeMessage } from "amqplib";
import { InternalUser } from '../../models/internal-user.model';

export class UserCreatedListener extends Listener<UserCreatedEvent> {
    readonly queue = Queues.UserCreated;

    async onMessage(data: { username: string; email: string; }, msg: ConsumeMessage | null) {
        try {
            if(!msg) throw Error('Object of type ConsumeMessage is null. cant consume this message.');

            await InternalUser.build({
                username: data.username,
                email: data.email
            }).save();


            this.channel.ack(msg);
        } catch(e) {
            console.error(e);
            console.error('Cant save user in workouts db');
        }
    }
    
}
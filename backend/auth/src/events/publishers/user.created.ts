import { Publisher, Queues, UserCreatedEvent } from "@erezmiz-pr/pr-common";

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
    readonly queue = Queues.UserCreated;
}
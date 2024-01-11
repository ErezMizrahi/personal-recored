import { Queues } from "../types/queues";

export interface UserCreatedEvent {
    queue: Queues.UserCreated,
    data: {
        username: string;
        email: string;
    }
}
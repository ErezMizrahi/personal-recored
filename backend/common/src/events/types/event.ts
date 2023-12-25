import { Queues } from "./queues";

export interface Event {
    queue: Queues;
    data: any;
} 
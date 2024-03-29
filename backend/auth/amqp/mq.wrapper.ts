import { Channel, Connection, connect } from "amqplib";

class RabbitMqWrapper {
    private _channel?: Channel;
    private _connection?: Connection;

    get channel() {
        if(!this._channel) throw new Error('cant access rabbit mq channel before connection to the server!')
        return this._channel;
    }

    get conenction() {
        if(!this._connection) throw new Error('cant access rabbit mq conenction  before connection to the server!')
        return this._connection;
    }

    async connect(connectionString: string, retry = 3) {
        if(retry <= 0) {
            console.error('Failed to connect to RabbitMQ 3 times');
            return;
        }
        try {
            console.log('Attempting to connect to RabbitMQ at:', connectionString);
            const connection = await connect(connectionString);
            const channel = await connection.createChannel();
            this._channel = channel;
            this._connection = connection;
            console.log('Successfully connected to RabbitMQ');

        } catch (e) {
            console.error('Failed to connect to RabbitMQ:', e);
            console.log(`retry ammount is: ${retry}. trying again in 1 second...`)
            await new Promise((resolve, reject) => setTimeout((e) => {resolve(e)} , 15000));
            this.connect(connectionString, --retry);
        }
    }

    async closeConnections() {
        if (this._channel) {
            await this._channel.close();
            console.log('RabbitMQ channel closed');
        }
        if (this._connection) {
            await this._connection.close();
            console.log('RabbitMQ connection closed');
        }
    }
}

export const rabbitMqWrapper = new RabbitMqWrapper();
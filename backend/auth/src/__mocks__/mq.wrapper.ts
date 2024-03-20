// mq.wrapper.ts
export const rabbitMqWrapper = {
    channel: {
        sendToQueue: jest.fn()
    },
    connection: {
        close: jest.fn(),
        createChannel: jest.fn().mockImplementation(() => { 
            return {
                sendToQueue: jest.fn()
            }
        }),
    }
}
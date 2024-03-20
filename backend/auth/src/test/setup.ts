import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import { app } from '../app';
import { rabbitMqWrapper } from '../mq.wrapper';

let mongoServer: MongoMemoryServer;

jest.mock('../mq.wrapper')

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);

  // Set environment variables
  process.env.NODE_ENV = 'jest test';
  process.env.JWT_KEY = 'test';
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

 declare global {
  var signUp: () => void;
 }

 global.signUp = async (): Promise<void> => {
  await request(app)
        .post('/api/users/signup')
        .set('Authorization', 'Bearer dummytoken')
        .send({
            firstName :'test',
            lastName: 'test',
            gender: 'male',
            age: '30',
            weight: '73',
            height: '173'
        })
        .expect(201);
        expect(rabbitMqWrapper.channel.sendToQueue).toHaveBeenCalled();

        return new Promise((resolve) => { resolve() });
 }
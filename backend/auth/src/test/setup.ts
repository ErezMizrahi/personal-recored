import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest'; 

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'test';
    process.env.NODE_ENV = 'jest test';
    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();
    await mongoose.connect(mongoUri);
});


beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for(const collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    
    await mongoose.connection.close();
});

declare global {
    var signup: () => Promise<string[]>;
}

global.signup = async () => {
    const body = {
        firstName :'test',
        lastName: 'test',
        gender: 'male',
        age: '30',
        weight: '73',
        height: '173'
    }

    const response = await request(app)
        .post('/api/users/signup')
        .set('Authorization', 'Bearer dummytoken')
        .send(body)
        .expect(201);
    
    expect(response.get('Set-Cookie')).toBeDefined();
    const cookie = response.get('Set-Cookie');
    return cookie;
}
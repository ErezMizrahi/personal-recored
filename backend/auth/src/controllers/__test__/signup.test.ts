import request from 'supertest'; // Add missing import statement
import { app } from "../../app";

it('return 201 on successfull signup', async () => {
    return request(app)
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
        .expect(201)
});

it('return 401 on invalid google id token', async () => {
    return request(app)
        .post('/api/users/signup')
        .set('Authorization', 'Bearer invalidtoken')
        .send({
            firstName :'test',
            lastName: 'test',
            gender: 'male',
            age: '30',
            weight: '73',
            height: '173'
        })
        .expect(401)
});

it('return 200 the current user if the user exist and there is a valid google token', async () => {
    //user sign up
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

        //get user
        return request(app)
        .get('/api/users/me')
        .set('Authorization', 'Bearer dummytoken')
        .expect(200);
});


it('return 401 if there is a user but the token sent to /me is invalid', async () => {
    //user sign up
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

        //get user
        return request(app)
        .get('/api/users/me')
        .set('Authorization', 'Bearer invalidtoken')
        .expect(401);
});
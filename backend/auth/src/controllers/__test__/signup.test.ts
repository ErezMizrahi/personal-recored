import request from 'supertest';
import { app } from "../../app";
import { rabbitMqWrapper } from '../../mq.wrapper';

it('return 201 on successfull signup', async () => signUp() );

it('return 401 on invalid google id token', async () => {
    await request(app)
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

        expect(rabbitMqWrapper.channel.sendToQueue).not.toHaveBeenCalled();
});

it('return 200 the current user if the user exist and there is a valid google token', async () => {
    await signUp();
    
    //get user
    return request(app)
        .get('/api/users/me')
        .set('Authorization', 'Bearer dummytoken')
        .expect(200);
});


it('return 401 if there is a user but the token sent to /me is invalid', async () => {
    await signUp();
    
    //get user
    return request(app)
        .get('/api/users/me')
        .set('Authorization', 'Bearer invalidtoken')
        .expect(401);
});
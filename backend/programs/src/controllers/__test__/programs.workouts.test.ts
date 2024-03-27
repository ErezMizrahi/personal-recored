import request from 'supertest'
import { app } from '../../app'
import { InternalUser } from '../../models/internal-user.model';
import e from 'express';

const buildUser = async (email: string = 'test@gmail.com') => {
    const user = InternalUser.build({
        username: 'test',
        email,
        programs: []
    });

    await user.save();
    return user;
}

const testProgram = {
    name: 'test program',
    endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 1).toISOString(),
    workouts: [
        {
            name: 'test workout',
            daysOfTheWeek: ['monday'],
            exercises: [
                {
                    name: 'test exercise',
                    sets: 3,
                    reps: 10,
                    weight: 100,
                    rest: 60
                }
            ]
        }
    ]
}

it('throws if there is no user', async () => {
    await request(app)
    .post('/api/programs/create')
    .set('Authorization', 'Bearer dummytoken')
    .send(testProgram)
    .expect(404);
 });

 it('throws if program id is invalid', async () => {
    await buildUser();

    await request(app)
    .post('/api/programs/create')
    .set('Authorization', 'Bearer dummytoken')
    .send(testProgram)
    .expect(201);

    const response = await request(app)
    .get(`/api/programs/dfjsbkjfk/workouts`)
    .set('Authorization', 'Bearer dummytoken')
    
    expect(response.status).toBe(400);
    expect(response.body.errors[0].message).toBe('programId must be a valid mongo id');

  });

it('gets the logged in user programs', async () => {
    await buildUser();

    const { body: { program_id: programId} }  = await request(app)
    .post('/api/programs/create')
    .set('Authorization', 'Bearer dummytoken')
    .send(testProgram)
    .expect(201);
    
    return await request(app)
    .get(`/api/programs/${programId}/workouts`)
    .set('Authorization', 'Bearer dummytoken')
    .expect(200);
    
});
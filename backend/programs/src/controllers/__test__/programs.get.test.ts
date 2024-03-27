import request from 'supertest'
import { app } from '../../app'
import { InternalUser } from '../../models/internal-user.model';

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


it('gets the logged in user programs', async () => {
    await buildUser();

    await request(app)
    .post('/api/programs/create')
    .set('Authorization', 'Bearer dummytoken')
    .send(testProgram)
    .expect(201);
    
    const response = await request(app)
    .get('/api/programs/current')
    .set('Authorization', 'Bearer dummytoken')
    
    expect(response.status).toBe(200);
    
    const userPrograms = await InternalUser.findOne({email: 'test@gmail.com'}).populate('programs');
    expect(userPrograms!.programs?.length).toBe(1);
    expect(userPrograms!.programs![0].name).toBe(response.body[0].name);
});
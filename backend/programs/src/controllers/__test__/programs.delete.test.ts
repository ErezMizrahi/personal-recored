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


it('delete the current user program by id', async () => {
    await buildUser();

    //create a program
    const { body: { program_id: programId} }  = await request(app)
    .post('/api/programs/create')
    .set('Authorization', 'Bearer dummytoken')
    .send(testProgram)
    .expect(201);

    //delete the program
    await request(app)
    .delete(`/api/programs/${programId}/delete`)
    .set('Authorization', 'Bearer dummytoken')
    .expect(204);
    
});


it('deletes the program from the current logged in user', async () => {
    await buildUser();

    //create a program
    const { body: { program_id: programId} }  = await request(app)
    .post('/api/programs/create')
    .set('Authorization', 'Bearer dummytoken')
    .send(testProgram)
    .expect(201);

    let userPrograms = await InternalUser.findOne({email: 'test@gmail.com'}).populate('programs');
    expect(userPrograms!.programs!.length).toBe(1);

    //delete the program
    await request(app)
    .delete(`/api/programs/${programId}/delete`)
    .set('Authorization', 'Bearer dummytoken')
    .expect(204);

    userPrograms = await InternalUser.findOne({email: 'test@gmail.com'}).populate('programs');
    expect(userPrograms!.programs!.length).toBe(0);
});
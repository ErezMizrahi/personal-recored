import request from 'supertest'
import { app } from '../../app'
import { InternalUser } from '../../models/internal-user.model';

export const testProgram = {
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

const buildUser = async (email: string = 'test@gmail.com') => {
    const user = InternalUser.build({
        username: 'test',
        email,
        programs: []
    });

    await user.save();
    return user;
}

const deepCopy = (obj: any) => {
    return JSON.parse(JSON.stringify(obj));
}


it('throws if there is no user', async () => {
    return await request(app)
    .post('/api/programs/create')
    .set('Authorization', 'Bearer dummytoken')
    .send(testProgram).expect(404);

});

it('wont create a program for a diffrent user then the logged in user', async () => {
    buildUser('test2@gmail.com'); //not the user in the token from the currentGoogleUser middleware (common library)
    
    return await request(app)
    .post('/api/programs/create')
    .set('Authorization', 'Bearer dummytoken')
    .send(testProgram).expect(404);
});

it('throws if the endDate is in the past', async () => {
    buildUser();

    const localTestProgram = deepCopy(testProgram);
    localTestProgram.endDate = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 5).toISOString();

    const response = await request(app)
    .post('/api/programs/create')
    .set('Authorization', 'Bearer dummytoken')
    .send(localTestProgram).expect(400);

    expect(response.body.errors[0].message).toEqual('endDate must be in the future');
});  

it('throws if no workouts are in the request', async () => {
    buildUser();

    const localTestProgram = deepCopy(testProgram);
    localTestProgram.workouts = [];

    const response = await request(app)
    .post('/api/programs/create')
    .set('Authorization', 'Bearer dummytoken')
    .send(localTestProgram).expect(400);

    expect(response.body.errors[0].message).toEqual('workouts must be an array and not empty');
});  

it('throws if workouts are imvalid', async () => {
    buildUser();

    const localTestProgram = deepCopy(testProgram);
    localTestProgram.workouts[0].name = '';
    localTestProgram.workouts[0].daysOfTheWeek = [];
    localTestProgram.workouts[0].exercises = [];


    const response = await request(app)
    .post('/api/programs/create')
    .set('Authorization', 'Bearer dummytoken')
    .send(localTestProgram).expect(400);

    expect(response.body.errors[0].message).toEqual('workout name must be provided');
    expect(response.body.errors[1].message).toEqual('workout daysOfTheWeek must be provided');
    expect(response.body.errors[2].message).toEqual('workout exercises must be provided');
});  


it('throws if a spesific workout exercises are imvalid', async () => {
    buildUser();

    const localTestProgram = deepCopy(testProgram);
    localTestProgram.workouts[0].exercises[0].name = '';
    localTestProgram.workouts[0].exercises[0].sets = 0;
    localTestProgram.workouts[0].exercises[0].reps = 0;
    localTestProgram.workouts[0].exercises[0].weight = 0;
    localTestProgram.workouts[0].exercises[0].rest = -1;
    
    const response = await request(app)
    .post('/api/programs/create')
    .set('Authorization', 'Bearer dummytoken')
    .send(localTestProgram).expect(400);

    expect(response.body.errors[0].message).toEqual('exercise name must be provided');
    expect(response.body.errors[1].message).toEqual('exercise sets must be provided');
    expect(response.body.errors[2].message).toEqual('exercise reps must be provided');
    expect(response.body.errors[3].message).toEqual('exercise weight must be provided');
    expect(response.body.errors[4].message).toEqual('exercise rest must be provided');
});  

it('create a program for a the logged in user', async () => {
    buildUser();

    return await request(app)
    .post('/api/programs/create')
    .set('Authorization', 'Bearer dummytoken')
    .send(testProgram).expect(201);

});


it('adds the created program to the logged in user', async () => {
    await buildUser();

    await request(app)
    .post('/api/programs/create')
    .set('Authorization', 'Bearer dummytoken')
    .send(testProgram).expect(201);

    const userPrograms = await InternalUser.findOne({email: 'test@gmail.com'}).populate('programs');

    expect(userPrograms!.programs?.length).toEqual(1);
    expect(userPrograms!.programs![0].name).toEqual(testProgram.name);
});

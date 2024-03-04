import { TokenPayload } from "google-auth-library";
import { Exercise, ExercisesDoc } from "../models/excersies.model";
import { InternalUser } from "../models/internal-user.model";
import { Workout } from "../models/workouts.model";
import { Program } from "../models/program.model";

class WorkoutProgramService {
    
    async createProgram(name: string, user: TokenPayload) {
        const excersie = await Exercise.build({
            name: 'bench press',
            sets: 3,
            reps: 10,
            weight: 60,
            rest: 60
        });

        await excersie.save();

        const exercises: ExercisesDoc[] = [excersie]; 

        const workout = await Workout.build({
            name,
            exercises
        });

        await workout.save();

        const currentUser  = await InternalUser.findOne({email: user.email});

        const program = await Program.build({
            name: 'test program',
            owner: currentUser!,
            workouts: [workout]
        });

        await program.save();
        return program;
    }
}

const workoutProgramService = new WorkoutProgramService();
export default workoutProgramService;
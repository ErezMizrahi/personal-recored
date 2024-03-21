import { ExercisesAttrs, Workout } from "../models/workouts.model";

class WorkoutService {
    async createWorkout(name: string, excersies: ExercisesAttrs[], dayOfTheWeek: string[]) {
        const existingWorkout = await Workout.findOne({name});
        if(existingWorkout) throw Error('Workout with this name already exists');

        const workout = await Workout.build({
            name,
            dayOfTheWeek,
            exercises: excersies
        });

        await workout.save();
        return workout.name;
    }

    async findWorkouts(names: string[]) {
        const workouts = await Workout.find({name: {$in: names}});
        return workouts;
    }
}

const workoutService = new WorkoutService();
export { workoutService }
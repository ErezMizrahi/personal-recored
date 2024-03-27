import { ProgramDoc }  from "../models/program.model";

class UserService { 
    private claculateProgramLength(program: ProgramDoc, index: number) {
        const endDate = new Date(program.endDate);
        const workout = program.workouts[index];
        const daysOfTheWeek = workout.daysOfTheWeek;

    }
}
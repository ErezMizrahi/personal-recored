import { InternalUserDoc } from "../models/internal-user.model";
import { Program, ProgramDoc, WorkoutAttrs } from "../models/program.model";

class WorkoutProgramService {
    private async addProgramToUser(program: ProgramDoc, user: InternalUserDoc) {
        user.programs?.push(program);
        await user.save();
    }
    
    async deleteProgramById(user: InternalUserDoc, id: string) {
        const programs = await this.getPrograms(user);
        if(!programs) throw Error('User has no programs not found');

        const program = programs.find(program => program._id.toString() === id);
        if(!program) throw Error('Program not found');
        
        await Program.deleteOne({_id: id});
        user.programs = user.programs?.filter(program => program._id.toString() !== id);
        await user.save();
    }

    async createProgram(name: string, endDate: string, workouts: WorkoutAttrs[], user: InternalUserDoc) {
        const userPrograms = await this.getPrograms(user);
        const isExistByName = userPrograms?.find(program => program.name === name);
        if(isExistByName) throw Error('Program with this name already exists');

        const program = await Program.build({
            name,
            endDate,
            owner: user,
            workouts
        });

        await program.save();
        await this.addProgramToUser(program, user);

        return program;
    }

    async getPrograms(user: InternalUserDoc): Promise<ProgramDoc[] | undefined> {
        const userPrograms = await user.populate('programs');
        return userPrograms.programs;
    }

    async getWorkouts(user: InternalUserDoc, programId: string) {
        const userPrograms = await this.getPrograms(user);
        if(!userPrograms) throw Error('User has no programs');

        const workouts = userPrograms
            .filter(program => program._id.toString() === programId)
            .map(program =>  program.workouts);
        return workouts?.flat();
    }
}

const workoutProgramService = new WorkoutProgramService();
export default workoutProgramService;
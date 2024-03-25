import { TokenPayload } from "google-auth-library";
import { InternalUser, InternalUserDoc } from "../models/internal-user.model";
import { Program, ProgramDoc, WorkoutAttrs } from "../models/program.model";

class WorkoutProgramService {
   
    private async getProgramBy(param: string) {
        return await Program.findOne({[param]: param});
    }

    private async deleteProgramById(id: string) {
        const program = await Program.findById(id);
        if(!program) throw Error('Program not found');

        await Program.deleteOne({_id: id});
    }

    private async addProgramToUser(program: ProgramDoc, user: InternalUserDoc) {
        user.programs?.push(program);
        await user.save();
    }

    async createProgram(name: string, endDate: string, workouts: WorkoutAttrs[], user: InternalUserDoc) {
        if(await this.getProgramBy(name)) throw Error('Program with this name already exists');

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

    async getWorkouts(user: InternalUserDoc) {
        const userPrograms = await user.populate('programs');
        const workouts = userPrograms.programs?.map(program =>  program.workouts);
        return workouts?.flat();
    }
}

const workoutProgramService = new WorkoutProgramService();
export default workoutProgramService;
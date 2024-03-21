import { TokenPayload } from "google-auth-library";
import { InternalUser, InternalUserDoc } from "../models/internal-user.model";
import { Program, ProgramDoc, WorkoutAttrs } from "../models/program.model";

class WorkoutProgramService {
   
    private async getProgramByName(name: string) {
        return await Program.findOne({name});
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
        if(await this.getProgramByName(name)) throw Error('Program with this name already exists');

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

    async getPrograms(user: InternalUserDoc) {
        return (await user.populate('programs')).programs;
    }
}

const workoutProgramService = new WorkoutProgramService();
export default workoutProgramService;
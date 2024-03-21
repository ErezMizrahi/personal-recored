import { TokenPayload } from "google-auth-library";
import { InternalUser } from "../models/internal-user.model";
import { Program } from "../models/program.model";
import { workoutService } from "./workout";

class WorkoutProgramService {
   
    private async getProgramByName(name: string) {
        return await Program.findOne({name});
    }

    private async deleteProgramById(id: string) {
        const program = await Program.findById(id);
        if(!program) throw Error('Program not found');

        await Program.deleteOne({_id: id});
    }

    
    async createProgram(name: string, endDate: string, workoutsNames: string[], user: TokenPayload) {
        if(await this.getProgramByName(name)) throw Error('Program with this name already exists');

        const currentUser  = await InternalUser.findOne({email: user.email});
        const workouts = await workoutService.findWorkouts(workoutsNames);
        if(!workouts) throw Error('no Workouts were found');

        const program = await Program.build({
            name,
            endDate,
            owner: currentUser!,
            workouts
        });

        await program.save();
        return program;
    }
}

const workoutProgramService = new WorkoutProgramService();
export default workoutProgramService;
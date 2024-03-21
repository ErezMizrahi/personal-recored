import { Request, Response } from "express";
import workoutProgramService from "../services/program";
import { workoutService } from "../services/workout";

export const createProgram = async (req: Request, res: Response) => {
    console.log('he')

    const workoutName = await workoutService.createWorkout('test workout', [{
        name: "bench pres2s",
        sets: 3,
        reps: 10,
        weight: 60,
        rest: 60,
    }], ['sunday']);

    const program = await workoutProgramService.createProgram('test progrsssam', '2021-12-31', [workoutName], req.currentGoogleUser!);
    res.json({ 
        message: program
    });
    res.end();
}
import { Request, Response } from "express";
import workoutProgramService from "../services/workout-program";

export const createProgram = async (req: Request, res: Response) => {
    console.log('he')
    const program = await workoutProgramService.createProgram('a', req.currentUser!);
    res.json({ 
        message: program
    });
    res.end();
}
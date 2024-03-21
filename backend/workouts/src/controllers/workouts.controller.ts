import { Request, Response } from "express";
import workoutProgramService from "../services/program";

export const createProgram = async (req: Request, res: Response) => {
    const { name, endDate, workouts } = req.body;
    const program = await workoutProgramService.createProgram(name, endDate, workouts, req.currentInternalUser!);
    res.status(201).json(program);
}

export const getCurrentUserPrograms = async (req: Request, res: Response) => {
    const programs = await workoutProgramService.getPrograms(req.currentInternalUser!);
    res.status(200).json(programs);
}

export const getCurrentUserWorkouts = async (req: Request, res: Response) => {
    const workouts = await workoutProgramService.getWorkouts(req.currentInternalUser!);
    res.status(200).json(workouts);
}
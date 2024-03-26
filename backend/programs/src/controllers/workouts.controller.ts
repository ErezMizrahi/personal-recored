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
    const workouts = await workoutProgramService.getWorkouts(req.currentInternalUser!, req.params.programId);
    res.status(200).json(workouts);
}

export const deleteProgramById = async (req: Request, res: Response) => {
    await workoutProgramService.deleteProgramById(req.currentInternalUser!, req.params.programId);
    res.status(204).send();
}
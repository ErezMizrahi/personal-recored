import { Request, Response } from "express";
import internalUserService from "../services/internal-user.service";

export const getCurrentUser = async (req: Request, res: Response) => {
    res.status(200).json(req.currentUser);
}

export const signUp = async (req: Request, res: Response) => {
    const user = await internalUserService.register(req.currentUser!);
    res.status(200).json(user);
}
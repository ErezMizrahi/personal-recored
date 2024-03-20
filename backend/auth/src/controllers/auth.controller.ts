import { Request, Response } from "express";
import internalUserService from "../services/internal-user.service";
import { RegisterUserDetails } from "../types/register-user-details.type";

export const getCurrentUser = async (req: Request, res: Response) => {
    const user = await internalUserService.getCurrentUser(req.currentGoogleUser!);
    res.status(200).json(user);
}

export const deleteUsers = async (req: Request, res: Response) => {
     await internalUserService.removeUser();
    res.end()
}

export const signUp = async (req: Request, res: Response) => {
    const userDeatils: RegisterUserDetails = req.body;
    const user = await internalUserService.signup(userDeatils, req.currentGoogleUser!);
    res.status(201).json(user);
}
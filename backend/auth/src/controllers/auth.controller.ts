import { Request, Response } from "express";
import internalUserService from "../services/internal-user.service";
import { RegisterUserDetails } from "../types/register-user-details.type";

export const getCurrentUser = async (req: Request, res: Response) => {
    const user = await internalUserService.getCurrentUser(req.currentUser!);
    res.status(200).json(user);
}

export const test = async (req: Request, res: Response) => {
    res.status(200).json({hello: "world!"});
}

export const deleteUsers = async (req: Request, res: Response) => {
     await internalUserService.removeUser();
    res.end()
}

export const signUp = async (req: Request, res: Response) => {
    const userDeatils: RegisterUserDetails = req.body;
    console.log('11111')
    const user = await internalUserService.register(userDeatils, req.currentUser!);
    res.status(200).json(user);
}


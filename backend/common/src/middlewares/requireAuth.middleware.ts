import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/notAuthorized.error";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if(!req.currentGoogleUser) {
        throw new NotAuthorizedError();
    }
    next();
}
import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/notAuthorized.error";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if(!req.currentUser && !req.currentUser === undefined) {
        throw new NotAuthorizedError();
    }

    next();
}
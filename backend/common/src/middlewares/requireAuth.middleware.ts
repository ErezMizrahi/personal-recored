import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/notAuthorized.error";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    console.log('erez')
    console.log(req.currentUser)
    if(!req.currentUser && !req.currentUser === undefined) {
        throw new NotAuthorizedError();
    }

    next();
}
import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/notAuthorized.error";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    console.log('erez')
    console.log(req.currentUser)
    if(!req.currentUser && !req.currentUser === undefined) {
    console.log('erez2')

        throw new NotAuthorizedError();
    }

    console.log('2222')


    next();
}
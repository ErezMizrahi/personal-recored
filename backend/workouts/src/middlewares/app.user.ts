import { Request, Response, NextFunction } from "express";
import { InternalUser, InternalUserDoc } from "../models/internal-user.model";
import { NotFoundError } from '@erezmiz-pr/pr-common';

declare global {
    namespace Express {
        interface Request {
            currentInternalUser?: InternalUserDoc
        }
    }
}


export const requireAppUser = async (req: Request, res: Response, next: NextFunction) => {
    if(!(req.currentGoogleUser!.email)) throw Error('Cant get user email');
    
    const internalUser = await InternalUser.findOne({email: req.currentGoogleUser!.email});
    if(!internalUser) throw new NotFoundError();

    req.currentInternalUser = internalUser;

    next();
}
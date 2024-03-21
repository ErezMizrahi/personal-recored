import { Request, Response, NextFunction } from "express";
import { InternalUser } from "../models/internal-user.model";

export const requireAppUser = async (req: Request, res: Response, next: NextFunction) => {
    if(!(req.currentGoogleUser!.email)) throw Error('Cant get user email');
    console.log('require app user : ', req.currentGoogleUser?.email);
    
    const internalUser = await InternalUser.findOne({email: req.currentGoogleUser!.email});

    if(!internalUser) throw Error('User is not registerd!');

    next();
}
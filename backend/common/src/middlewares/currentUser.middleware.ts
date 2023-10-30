import { Request, Response, NextFunction } from "express";
import { OAuth2Client, TokenPayload } from 'google-auth-library';

declare global {
    namespace Express {
        interface Request {
            currentUser?: TokenPayload
        }
    }
}

export const currentUser = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.get('Authorization')) {
        return next();
    }

    try {
        const client = new OAuth2Client();

        const authorization = req.get('Authorization');
        let idToken = '';
        if(authorization) {
            idToken = authorization.split(' ')[1];
        }

        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_ID
        });

        const payload = ticket.getPayload();
       
        req.currentUser = payload;
    } catch (e) {
        console.log(e);
    } finally {
        return next();
    }
}
import { Request, Response, NextFunction } from "express";
import { OAuth2Client, TokenPayload } from 'google-auth-library';

declare global {
    namespace Express {
        interface Request {
            currentGoogleUser?: TokenPayload
        }
    }
}

export const currentGoogleUser = async (req: Request, res: Response, next: NextFunction) => {
    if(process.env.NODE_ENV === 'jest test') {
        const authorization = req.get('Authorization');
        if(authorization) {
            const idToken = authorization.split(' ')[1];
            if(idToken === 'invalidtoken') {
                return next();
            }

            req.currentGoogleUser = { iss: "", sub: "", aud: "", iat: 0, exp: 0, email: 'test@gmail.com', name: 'test2', picture: '' };
        }
        
        return next();
    }

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
       
        req.currentGoogleUser = payload;
    } catch (e) {
        console.log(e);
    } finally {
        return next();
    }
}
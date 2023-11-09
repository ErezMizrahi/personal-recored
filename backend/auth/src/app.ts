import express, { Request, Response } from 'express'
import 'express-async-errors'

import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { authRouter } from './routes/auth.route';
import { NotFoundError, errorHanlder } from '@erezmiz-pr/pr-common';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users/', authRouter);

// app.get('/api/users/validate-user', (req: Request, res: Response) => {
//     const authorization = req.get('Authorization');
//     let idToken = '';
//     if(authorization) {
//         idToken = authorization.split(' ')[1];
//     }
//     console.log(idToken)
//     const client = new OAuth2Client();
//     async function verify() {
//         const ticket = await client.verifyIdToken({
//             idToken,
//             audience: process.env.GOOGLE_ID
//         });
//         const payload = ticket.getPayload();
//         const userid = payload!['sub'];
//         // If request specified a G Suite domain:
//         // const domain = payload['hd'];
//         console.log(userid, payload);
//       }
//       verify().catch(console.error);
//     res.status(200).json({
//         message: 'ok'
//     });
// })

app.all('*', async () => { throw new NotFoundError() });

//error handling
app.use(errorHanlder);
export { app }
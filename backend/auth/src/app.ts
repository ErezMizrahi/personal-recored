import express from 'express'
import 'express-async-errors'
import { authRouter } from './routes/auth.route';
import { NotFoundError, errorHanlder } from '@erezmiz-pr/pr-common';

const app = express();

// app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users', authRouter);
app.all('*', async () => { 
    console.log('404');
    throw new NotFoundError();    
 });

// error handling
app.use(errorHanlder);
export { app }
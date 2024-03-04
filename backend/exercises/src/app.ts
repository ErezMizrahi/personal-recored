import express from 'express'
import 'express-async-errors'

import { NotFoundError, errorHanlder } from '@erezmiz-pr/pr-common';
import { excersiesRouter } from './routes/exercises.route';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/exercises/', excersiesRouter);


app.all('*', async () => { throw new NotFoundError() });

//error handling
app.use(errorHanlder);
export { app }
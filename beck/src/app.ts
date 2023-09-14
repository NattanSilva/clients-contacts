import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import handleAppError from './errors/handleAppError';
import contactRoutes from './routes/contact.routes';
import sessionRoutes from './routes/session.routes';
import userRoutes from './routes/user.routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/login', sessionRoutes);
app.use('/contact', contactRoutes);

app.use(handleAppError);

export default app;

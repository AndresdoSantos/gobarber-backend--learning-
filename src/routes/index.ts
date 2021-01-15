import { Router } from 'express';

import appoitmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use('/appointments', appoitmentsRouter);
routes.use('/users', usersRouter);

export default routes;

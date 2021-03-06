import { Router } from 'express';

import appoitmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use('/appointments', appoitmentsRouter);
routes.use('/users', usersRouter);

export default routes;

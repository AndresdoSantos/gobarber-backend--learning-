import { Router } from 'express';

import SessionsController from '../controllers/SessionsControllers';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionsController.create);

sessionsRouter.get('/', async (request, response) => {
  return response.json({
    ok: true,
  });
});

export default sessionsRouter;

import { Router } from 'express';
import matcheController from '../controllers/matcheController';
import isAuth from '../auth/isAuth';

const matcheRoute = Router();

matcheRoute.get('/matches', matcheController.matcheGetAll);

matcheRoute.post(
  '/matches',
  isAuth,
  matcheController.matcheCreate,
);

matcheRoute.patch(
  '/matches/:id',
  isAuth,
  matcheController.matcheUpdate,
);

matcheRoute.patch(
  '/matches/:id/finish',
  isAuth,
  matcheController.matcheUpdateInProgress,
);

export default matcheRoute;

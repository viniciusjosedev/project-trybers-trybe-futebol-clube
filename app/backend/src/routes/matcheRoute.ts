import { Router } from 'express';
import matcheController from '../controllers/matcheController';
import isAuth from '../auth/isAuth';
// import matcheValidate from '../middlewares/matcheValidate';

const matcheRoute = Router();

matcheRoute.get('/matches', matcheController.matcheGetAll);

matcheRoute.post(
  '/matches',
  isAuth,
  // matcheValidate.matcheBodyUpdateInProgressValidate,
  matcheController.matcheCreate,
);

matcheRoute.patch(
  '/matches/:id',
  isAuth,
  // matcheValidate.matcheBodyUpdateValidate,
  matcheController.matcheUpdate,
);

matcheRoute.patch(
  '/matches/:id/finish',
  isAuth,
  matcheController.matcheUpdateInProgress,
);

export default matcheRoute;

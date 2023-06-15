import { Router } from 'express';
import matcheController from '../controllers/matcheController';
import isAuth from '../auth/isAuth';

const matcheRoute = Router();

matcheRoute.get('/matches', matcheController.matcheGetAll);

matcheRoute.patch('/matches/:id/finish', isAuth, matcheController.matcheUpdate);

export default matcheRoute;

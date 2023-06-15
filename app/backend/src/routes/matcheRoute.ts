import { Router } from 'express';
import matcheController from '../controllers/matcheController';

const matcheRoute = Router();

matcheRoute.get('/matches', matcheController.matcheGetAll);

export default matcheRoute;

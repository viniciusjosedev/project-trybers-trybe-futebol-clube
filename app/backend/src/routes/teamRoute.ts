import { Router } from 'express';
import teamController from '../controllers/teamController';

const teamRoute = Router();

teamRoute.get('/teams', teamController.teamGetAll);
teamRoute.get('/teams/:id', teamController.teamGetById);

export default teamRoute;

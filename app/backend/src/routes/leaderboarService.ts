import { Router } from 'express';
import leaderboardController from '../controllers/leaderboardController';

const leaderboardRoute = Router();

leaderboardRoute.get('/leaderboard/home', leaderboardController.leaderboardGetHome);

export default leaderboardRoute;

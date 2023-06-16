import { Router } from 'express';
import leaderboardController from '../controllers/leaderboardController';

const leaderboardRoute = Router();

leaderboardRoute.get('/leaderboard/home', leaderboardController.leaderboardGetHome);
leaderboardRoute.get('/leaderboard/away', leaderboardController.leaderboardGetAway);

export default leaderboardRoute;

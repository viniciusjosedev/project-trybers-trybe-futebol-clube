import { Router } from 'express';
import leaderboardController from '../controllers/leaderboardController';

const leaderboardRoute = Router();

leaderboardRoute.get('/leaderboard/home', leaderboardController.leaderboardGetHome);
leaderboardRoute.get('/leaderboard/away', leaderboardController.leaderboardGetAway);
leaderboardRoute.get('/leaderboard', leaderboardController.leaderboardGet);

export default leaderboardRoute;

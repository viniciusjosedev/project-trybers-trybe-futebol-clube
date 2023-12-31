import { Request, Response } from 'express';
import matchesService from '../services/matchesService';
import teamService from '../services/teamService';
import Matche from '../Interfaces/Matche';

type Data = {
  'name': string,
  'totalPoints': number,
  'totalGames': number,
  'totalVictories': number,
  'totalDraws': number,
  'totalLosses': number,
  'goalsFavor': number,
  'goalsOwn': number,
  'goalsBalance': number,
  'efficiency': number
};

const generateData = () => ({
  name: '',
  efficiency: 0,
  goalsBalance: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  totalDraws: 0,
  totalGames: 0,
  totalLosses: 0,
  totalPoints: 0,
  totalVictories: 0,
});

const sortData = (a: Data, b: Data) => {
  if (a.totalPoints !== b.totalPoints) {
    return b.totalPoints - a.totalPoints;
  }
  if (a.totalVictories !== b.totalVictories) {
    return b.totalVictories - a.totalVictories;
  }
  if (a.goalsBalance !== b.goalsBalance) {
    return b.goalsBalance - a.goalsBalance;
  }
  return b.goalsFavor - a.goalsFavor;
};

const complementIfsHomeTeam = (o: Matche, data: Data) => {
  const result = data;
  if (o.homeTeamGoals === o.awayTeamGoals) {
    result.totalPoints += 1;
    result.totalDraws += 1;
    result.totalGames += 1;
  }
  if (o.homeTeamGoals > o.awayTeamGoals) {
    result.totalPoints += 3;
    result.totalVictories += 1;
    result.totalGames += 1;
  }
  if (o.homeTeamGoals < o.awayTeamGoals) {
    result.totalPoints += 0;
    result.totalLosses += 1;
    result.totalGames += 1;
  }

  return result;
};

const complementIfsAwayTeam = (o: Matche, data: Data) => {
  const result = data;
  if (o.awayTeamGoals === o.homeTeamGoals) {
    result.totalPoints += 1;
    result.totalDraws += 1;
    result.totalGames += 1;
  }
  if (o.awayTeamGoals > o.homeTeamGoals) {
    result.totalPoints += 3;
    result.totalVictories += 1;
    result.totalGames += 1;
  }
  if (o.awayTeamGoals < o.homeTeamGoals) {
    result.totalPoints += 0;
    result.totalLosses += 1;
    result.totalGames += 1;
  }

  return result;
};

const complementLeaderboardGetHome = (result: Matche[] | undefined, name: string)
: Data => {
  const data: Data = generateData();
  data.name = name;

  result?.forEach((o) => {
    const complement = complementIfsHomeTeam(o, data);

    data.totalPoints = complement.totalPoints;
    data.totalDraws = complement.totalDraws;
    data.totalLosses = complement.totalLosses;
    data.totalGames = complement.totalGames;

    data.goalsFavor += o.homeTeamGoals;
    data.goalsOwn += o.awayTeamGoals;

    data.efficiency = Number(((data.totalPoints / (data.totalGames * 3)) * 100).toFixed(2));
    data.goalsBalance = data.goalsFavor - data.goalsOwn;
  });

  return data;
};

const complementLeaderboardGetAway = (result: Matche[] | undefined, name: string)
: Data => {
  const data: Data = generateData();
  data.name = name;

  result?.forEach((o) => {
    const complement = complementIfsAwayTeam(o, data);

    data.totalPoints = complement.totalPoints;
    data.totalDraws = complement.totalDraws;
    data.totalLosses = complement.totalLosses;
    data.totalGames = complement.totalGames;

    data.goalsFavor += o.awayTeamGoals;
    data.goalsOwn += o.homeTeamGoals;

    data.efficiency = Number(((data.totalPoints / (data.totalGames * 3)) * 100).toFixed(2));
    data.goalsBalance = data.goalsFavor - data.goalsOwn;
  });

  return data;
};

const leaderboardGetHome = async (_req: Request, res: Response): Promise<Response | void> => {
  const allTeams = await teamService.teamGetAll();

  const data = await Promise.all(allTeams.map(async (e, _i) => {
    const result = await matchesService.matchGetByHomeTeamId({ homeTeamId: e.id });

    return complementLeaderboardGetHome(result, e.teamName);
  }));

  data.sort(sortData);

  return res.status(200).json(data);
};

const leaderboardGetAway = async (_req: Request, res: Response): Promise<Response | void> => {
  const allTeams = await teamService.teamGetAll();

  const data = await Promise.all(allTeams.map(async (e, _i) => {
    const result = await matchesService.matchGetByHomeTeamId({ awayTeamId: e.id });

    return complementLeaderboardGetAway(result, e.teamName);
  }));

  data.sort(sortData);

  return res.status(200).json(data);
};

const leaderboardGetComplement = (teste1: Data, teste2: Data) => {
  const result = {
    name: teste1.name,
    totalVictories: teste1.totalVictories + teste2.totalVictories,
    totalPoints: teste1.totalPoints + teste2.totalPoints,
    totalDraws: teste1.totalDraws + teste2.totalDraws,
    totalLosses: teste1.totalLosses + teste2.totalLosses,
    totalGames: teste1.totalGames + teste2.totalGames,
    goalsFavor: teste1.goalsFavor + teste2.goalsFavor,
    goalsOwn: teste1.goalsOwn + teste2.goalsOwn,
  } as Data;

  result.efficiency = Number(((result.totalPoints / (result.totalGames * 3)) * 100).toFixed(2));
  result.goalsBalance = result.goalsFavor - result.goalsOwn;

  return result;
};

const leaderboardGet = async (_req: Request, res: Response): Promise<Response | void> => {
  const allTeams = await teamService.teamGetAll();

  const data = await Promise.all(allTeams.map(async (e, _i) => {
    const result = await matchesService.matchGetByHomeTeamId({
      homeTeamId: e.id,
    });

    const result2 = await matchesService.matchGetByHomeTeamId({
      awayTeamId: e.id,
    });

    const teste1 = complementLeaderboardGetHome(result, e.teamName);
    const teste2 = complementLeaderboardGetAway(result2, e.teamName);

    return leaderboardGetComplement(teste1, teste2);
  }));

  data.sort(sortData);

  return res.status(200).json(data);
};

export default {
  leaderboardGetHome,
  leaderboardGetAway,
  leaderboardGet,
};

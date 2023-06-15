import { Request, Response } from 'express';
import matchesService from '../services/matchesService';
import RequestWithData from '../Interfaces/RequestWithData';
import Matche from '../Interfaces/Matche';
import teamService from '../services/teamService';

const matcheGetAll = async (req: Request, res: Response): Promise<Response | void> => {
  const { inProgress } = req.query;

  if (inProgress === 'true') {
    const result = await matchesService.matcheGetInProgress(true);

    return res.status(200).json(result);
  }

  if (inProgress === 'false') {
    const result = await matchesService.matcheGetInProgress(false);

    return res.status(200).json(result);
  }

  const result = await matchesService.matcheGetAll();

  return res.status(200).json(result);
};

const matcheUpdateInProgress = async (req: RequestWithData, res: Response):
Promise<Response | void> => {
  const { id } = req.params;

  await matchesService.matcheUpdateInProgress(id);

  return res.status(200).json({ message: 'Finished' });
};

const matcheUpdate = async (req: RequestWithData, res: Response):
Promise<Response | void> => {
  const { body, params: { id } } = req;

  await matchesService.matcheUpdate(body, id);

  return res.status(200).json({ message: 'Done' });
};

const matcheCreate = async (req: RequestWithData, res: Response): Promise<Response | void> => {
  const { body } = req;

  const insert = body as Matche;

  const listPromise = [
    teamService.teamGetById(insert.homeTeamId),
    teamService.teamGetById(insert.awayTeamId),
  ];

  const [homeTeam, awayTeam] = await Promise.all(listPromise);

  if (!homeTeam || !awayTeam) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  if (insert.homeTeamId === insert.awayTeamId) {
    return res.status(422).json({
      message: 'It is not possible to create a match with two equal teams' });
  }

  const result = await matchesService.matcheCreate(body);

  return res.status(201).json(result);
};

export default {
  matcheGetAll,
  matcheUpdateInProgress,
  matcheUpdate,
  matcheCreate,
};

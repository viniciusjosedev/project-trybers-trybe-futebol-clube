import { Request, Response } from 'express';
import matchesService from '../services/matchesService';

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

export default {
  matcheGetAll,
};

import { Request, Response } from 'express';
import matchesService from '../services/matchesService';

const matcheGetAll = async (req: Request, res: Response): Promise<Response | void> => {
  const result = await matchesService.matcheGetAll();

  return res.status(200).json(result);
};

export default {
  matcheGetAll,
};

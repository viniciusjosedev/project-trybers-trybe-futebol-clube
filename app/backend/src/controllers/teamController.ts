import { Request, Response } from 'express';
import teamService from '../services/teamService';

const teamGetAll = async (req: Request, res: Response): Promise<Response | void> => {
  const result = await teamService.teamGetAll();

  return res.status(200).json(result);
};

const teamGetById = async (req: Request, res: Response): Promise<Response | void> => {
  const { id } = req.params;

  const result = await teamService.teamGetById(id);

  return res.status(200).json(result);
};

export default {
  teamGetAll,
  teamGetById,
};

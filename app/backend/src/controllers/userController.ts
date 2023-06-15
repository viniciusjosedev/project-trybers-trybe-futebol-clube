import { Request, Response } from 'express';
import { compareSync } from 'bcryptjs';
import userService from '../services/userService';
import generateToken from '../utils/generateToken';
import RequestWithData from '../Interfaces/RequestWithData';

const login = async (req: Request, res: Response): Promise<Response | void> => {
  const { email, password } = req.body;

  const result = await userService.userGetByEmail(email);

  if (!result) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const validate = compareSync(password, result?.password);

  if (!validate) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const data = {
    email: result.email,
    username: result.username,
    id: result.id,
    role: result.role,
  };

  return res.status(200).json({ token: generateToken(data) });
};

const getRole = async (req: RequestWithData, res: Response): Promise<Response | void> => {
  const { data } = req;

  if (data) { return res.status(200).json({ role: data.role }); }
};

export default {
  login,
  getRole,
};

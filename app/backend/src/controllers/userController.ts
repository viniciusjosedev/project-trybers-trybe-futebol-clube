import { Request, Response } from 'express';
import { compareSync } from 'bcryptjs';
import getDataAuth from '../auth/getDataAuth';
import userService from '../services/userService';
import generateToken from '../utils/generateToken';

const complementGetRole = (res: Response, error: Error) => {
  if (error.message === 'jwt malformed') {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  if (error.message === 'invalid token') {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  return res.status(401).json({ message: error.message });
};

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
    data: {
      email: result.email,
      username: result.username,
      id: result.id,
      role: result.role,
    },
  };

  return res.status(200).json({ token: generateToken(data) });
};

const getRole = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const validate = getDataAuth(authorization);

    return res.status(200).json({ role: validate.data.role });
  } catch (error) {
    if (!(error instanceof Error)) {
      return res.status(500).json({ message: 'SERVER INTERNAL ERROR' });
    }
    complementGetRole(res, error);
  }
};

export default {
  login,
  getRole,
};

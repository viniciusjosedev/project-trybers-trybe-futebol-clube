import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import Data from '../Interfaces/Data';
import RequestWithData from '../Interfaces/RequestWithData';

const JWT_SECRET = process.env.JWT_SECRET || 'password';

const complementAuth = (res: Response, error: Error) => {
  if (error.message === 'jwt malformed') {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  if (error.message === 'invalid token') {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  return res.status(401).json({ message: error.message });
};

export default async (req: RequestWithData, res: Response, next: NextFunction)
: Promise<Response | void> => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const verific = verify(authorization, JWT_SECRET) as Data;

    req.data = verific;

    next();
  } catch (error) {
    if (!(error instanceof Error)) {
      return res.status(500).json({ message: 'SERVER INTERNAL ERROR' });
    }
    complementAuth(res, error);
  }
};

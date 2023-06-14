import { NextFunction, Request, Response } from 'express';
import validations from './validations';

const userBodyLoginValidate = async (req: Request, res: Response, next: NextFunction)
: Promise<Response | void> => {
  const { body } = req;

  const { message } = validations.userBodyLoginValidate(body);

  if (message) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  next();
};

export default {
  userBodyLoginValidate,
};

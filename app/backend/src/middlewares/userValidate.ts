import { NextFunction, Request, Response } from 'express';

const userBodyLoginValidate = async (req: Request, res: Response, next: NextFunction)
: Promise<Response | void> => {
  const validate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { body } = req;

  if (!body.email || !body.password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (body.password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  if (!validate.test(body.email)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
};

export default {
  userBodyLoginValidate,
};

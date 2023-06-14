import { Request, Response } from 'express';
import { compareSync } from 'bcryptjs';
import User from '../Interfaces/User';
import userService from '../services/userService';
import generateToken from '../utils/generateToken';

const login = async (req: Request, res: Response): Promise<Response | void> => {
  const { email, password } = req.body;

  const result = await userService.userGetByEmail(email);

  if (!result) {
    return res.status(400).json({ message: 'email not exist' });
  }
  const validate = compareSync(password, result?.password);

  if (!validate) {
    return res.status(400).json({ message: 'password wrong' });
  }

  const data: Partial<User> = {
    email: result.email,
    username: result.username,
    id: result.id,
    role: result.role,
  };

  const token = generateToken(data);

  return res.status(200).json({ token });
};

export default {
  login,
};

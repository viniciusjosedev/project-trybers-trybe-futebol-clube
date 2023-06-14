import { verify } from 'jsonwebtoken';
import Data from '../Interfaces/Data';

const JWT_SECRET = process.env.JWT_SECRET || 'password';

export default (token: string): Data => {
  const verific = verify(token, JWT_SECRET);

  return verific as Data;
};

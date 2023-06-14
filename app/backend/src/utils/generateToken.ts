import { SignOptions, sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'password';

export default (payload: object) => {
  const config: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '7d',
  };

  return sign(payload, JWT_SECRET, config);
};

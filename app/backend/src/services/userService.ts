import User from '../Interfaces/User';
import userModel from '../database/models/userModel';

const userGetByEmail = async (email: string): Promise<User | undefined> => {
  const result = await userModel.findOne({ where: { email } });

  return result?.dataValues;
};

export default {
  userGetByEmail,
};

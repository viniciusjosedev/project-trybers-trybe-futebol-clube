import teamModel from '../database/models/teamModel';
import Team from '../Interfaces/Team';

const teamGetAll = async (): Promise<Team[]> => {
  const result = await teamModel.findAll();

  return result.map((e) => e.dataValues);
};

const teamGetById = async (id: number | string): Promise<Team | undefined> => {
  const result = await teamModel.findByPk(id);

  return result?.dataValues;
};

export default {
  teamGetAll,
  teamGetById,
};

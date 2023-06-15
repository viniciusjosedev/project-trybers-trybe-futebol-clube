import teamModel from '../database/models/teamModel';
import Matche from '../Interfaces/Matche';
import matcheModel from '../database/models/matcheModel';

const matcheGetAll = async (): Promise<Matche[]> => {
  const result = await matcheModel.findAll({
    include: [
      { model: teamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: teamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
    ],
  });

  return result.map((e) => e.dataValues);
};

export default {
  matcheGetAll,
};

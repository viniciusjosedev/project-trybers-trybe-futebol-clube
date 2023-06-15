import teamModel from '../database/models/teamModel';
import Matche from '../Interfaces/Matche';
import matcheModel from '../database/models/matcheModel';
import sequelize from '../database/models';

const matcheGetAll = async (): Promise<Matche[]> => {
  const result = await matcheModel.findAll({ include: [
    { model: teamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
    { model: teamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
  ],
  });

  return result.map((e) => e.dataValues);
};

const matcheGetInProgress = async (bool: boolean): Promise<Matche[]> => {
  const result = await matcheModel.findAll({
    where: { inProgress: bool },
    include: [
      { model: teamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: teamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
    ],
  });

  return result.map((e) => e.dataValues);
};

const matcheUpdate = async (id: string | number):
Promise<number> => sequelize.transaction(async (t) => {
  const [result] = await matcheModel.update({ inProgress: false }, {
    where: { id },
    transaction: t,
  });

  return result;
});

export default {
  matcheGetAll,
  matcheGetInProgress,
  matcheUpdate,
};

// import { Op } from 'sequelize';
import Team from '../Interfaces/Team';
import teamModel from '../database/models/teamModel';
import Matche from '../Interfaces/Matche';
import matcheModel from '../database/models/matcheModel';
import sequelize from '../database/models';

type MatcheWithHomeTeam = Matche & {
  homeTeam: {
    dataValues: Team
  }
};

const matcheGetAll = async (): Promise<Matche[]> => {
  const result = await matcheModel.findAll({ include: [
    { model: teamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
    { model: teamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
  ],
  });

  return result.map((e) => e.dataValues);
};

const matcheGetInProgress = async (bool: boolean): Promise<MatcheWithHomeTeam[]> => {
  const result = await matcheModel.findAll({
    where: { inProgress: bool },
    include: [
      { model: teamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: teamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
    ],
  });

  return result.map((e) => e.dataValues) as MatcheWithHomeTeam[];
};

const matcheUpdateInProgress = async (id: string | number):
Promise<number> => sequelize.transaction(async (t) => {
  const [result] = await matcheModel.update({ inProgress: false }, {
    where: { id },
    transaction: t,
  });

  return result;
});

const matcheUpdate = async (data: Partial<Matche>, id: number | string):
Promise<number> => sequelize.transaction(async (t) => {
  const [result] = await matcheModel.update(data, {
    where: { id },
    transaction: t,
  });

  return result;
});

const matcheCreate = async (data: Matche): Promise<Matche> => sequelize.transaction(async (t) => {
  const create = await matcheModel.create(data, { transaction: t });

  return create.dataValues;
});

const matchGetByHomeTeamId = async (id: string | number): Promise<Matche[] | undefined> => {
  const result = await matcheModel.findAll({ where: {
    homeTeamId: id,
    inProgress: false,
  } });

  return result.map((e) => e.dataValues);
};

export default {
  matcheGetAll,
  matcheGetInProgress,
  matcheUpdateInProgress,
  matcheUpdate,
  matcheCreate,
  matchGetByHomeTeamId,
};

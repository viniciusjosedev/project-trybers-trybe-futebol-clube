import { ModelDefined, DataTypes } from 'sequelize';
import Matche from '../../Interfaces/Matche';
import sequelize from '.';
import teamModel from './teamModel';

type matcheType = ModelDefined<Matche, Matche>;

const matcheModel: matcheType = sequelize.define('Matche', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    field: 'home_team_id',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    field: 'away_team_id',
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'in_progress',
    defaultValue: true,
  },
}, {
  tableName: 'matches',
  underscored: true,
  timestamps: false,
});

matcheModel.belongsTo(teamModel, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

matcheModel.belongsTo(teamModel, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

export default matcheModel;

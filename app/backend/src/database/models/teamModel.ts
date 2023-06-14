import { DataTypes, ModelDefined } from 'sequelize';
import sequelize from '.';
import Team from '../../Interfaces/Team';

// type teamOption = Optional<Team, 'id'>;
type teamType = ModelDefined<Team, Team>;

const teamModel: teamType = sequelize.define('Team', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  teamName: {
    field: 'team_name',
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
  underscored: true,
  tableName: 'teams',
});

export default teamModel;

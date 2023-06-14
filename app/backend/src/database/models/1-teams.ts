import { DataTypes } from 'sequelize';
import sequelize from '.';

const teamsModel = sequelize.define('Team', {
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

export default teamsModel;

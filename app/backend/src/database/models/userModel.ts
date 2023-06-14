import { ModelDefined, DataTypes } from 'sequelize';
import User from '../../Interfaces/User';
import sequelize from '.';

type userType = ModelDefined<User, User>;

const userModel: userType = sequelize.define('User', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  underscored: true,
  tableName: 'users',
});

export default userModel;

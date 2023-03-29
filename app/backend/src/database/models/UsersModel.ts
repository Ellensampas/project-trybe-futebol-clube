import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Users extends Model {
  declare id: number;
  declare userName: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userName: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  timestamps: false,
  modelName: 'users',
  underscored: true,
});

export default Users;

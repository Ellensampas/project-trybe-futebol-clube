import UsersModel from '../models/UsersModel';

const logs = async (usuario: string) => {
  const login = await UsersModel.findOne({ where: {
    email: usuario } });
  return login;
};

export default {
  logs,
};

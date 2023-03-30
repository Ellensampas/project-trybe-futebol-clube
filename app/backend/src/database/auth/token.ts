import * as jwt from 'jsonwebtoken';
import UsersModel from '../models/UsersModel';

const secret = process.env.JWT_SECRET || 'joaninha123';

export const criaToken = (payload: UsersModel) => jwt.sign({ payload }, secret, {
  algorithm: 'HS256',
  expiresIn: '5d',
});

export const validTk = (tk: string) => jwt.verify(tk, secret);

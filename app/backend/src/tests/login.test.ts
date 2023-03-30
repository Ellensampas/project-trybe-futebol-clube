import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UsersModel';

import { log, usuario } from './Mocks/loginMock';
import { Model } from 'sequelize';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa /login', () => {
  let response: Response;

  before(async () => {
    sinon.stub(Model, "findOne").resolves(usuario as UserModel);
  });

  after(()=>{
    (Model.findOne as sinon.SinonStub).restore();
  })

  it('se é possivel logar com o metodo POST e com email e senha validos', async () => {
    response = await chai.request(app).post('/login').send(log);
    expect(response.body).to.deep.eq(log);
    expect(response.status).to.deep.eq(200);
  });
});
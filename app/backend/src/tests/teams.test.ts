import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/TeamModel';

import { times, timeId } from './Mocks/teamsMocks';
import { Model } from 'sequelize';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa /Teams', () => {
  let response: Response;

  before(async () => {
    sinon.stub(Model, "findAll").resolves(times as Teams[]);
  });

  after(()=>{
    (Model.findAll as sinon.SinonStub).restore();
  })

  it('Retorna todos os times', async () => {
    response = await chai.request(app).get('/teams');
    expect(response.body).to.deep.eq(times);
    expect(response.status).to.deep.eq(200);
  });

  before(async ()  => {
    sinon.stub(Model, "findOne").resolves(timeId as Teams);
  });

  after(()=>{
    (Model.findOne as sinon.SinonStub).restore();
  })

  it('Retorna um unico time por id', async () => {
    response = await chai.request(app).get('/teams/4');
    expect(response.body).to.deep.eq(timeId);
    expect(response.status).to.deep.eq(200);
  });
});
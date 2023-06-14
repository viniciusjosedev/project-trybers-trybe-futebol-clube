import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

import resultTeamFindAll from './mocks/resultTeamFindAll';
const Jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

chai.use(chaiHttp);

const { expect } = chai;

describe('All tests', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

	afterEach(() => {
		sinon.restore();
	})

  it('Return teamFindAll', async () => {
		const result = await chai.request(app).get('/teams');
		
		expect(result.body).to.be.deep.equal(resultTeamFindAll);
  });

	it('Return teamFindById', async () => {
		const result = await chai.request(app).get('/teams/1');
		
		expect(result.body).to.be.deep.equal(resultTeamFindAll[0]);
  });

	it('Return userLogin sucess', async () => {
		sinon.stub(bcrypt, 'compareSync').resolves(true)
		sinon.stub(Jwt, "sign").resolves('123');
		
		const result = await chai.request(app).post('/login').send({
			"password": "secret_admin",
			"email": "admin@admin.com"
		});
		
		expect(result.status).to.be.deep.equal(200);
  });

	it('Return userLogin faill with email wrong', async () => {
		const result = await chai.request(app).post('/login').send({
			"password": "secret_admin",
			"email": "admin2@admin.com"});
		
		expect(result.status).to.be.deep.equal(401);
  });

	it('Return userLogin faill with password wrong', async () => {
		const result = await chai.request(app).post('/login').send({
			"password": "secret_admin2",
			"email": "admin@admin.com"
		});
		
		expect(result.status).to.be.deep.equal(401);
  });

	it('Return userLogin faill with email and password required', async () => {
		const result = await chai.request(app).post('/login').send({
			"password": "secret_admin2",
		});
		
		expect(result.status).to.be.deep.equal(400);
  });
});

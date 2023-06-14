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

const Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwidXNlcm5hbWUiOiJBZG1pbiIsImlkIjoxLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNjg2NzY1OTgyLCJleHAiOjE2ODczNzA3ODJ9.KsvL6NHWOKTjo_Z0vyfBbIpcgoS--Ayie6q421qg-2g'

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

		const result2 = await chai.request(app).post('/login').send({
			"password": "secret_admin",
			"email": "@admin.com"});

		expect(result2.status).to.be.deep.equal(401);

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

	it('Return /login/role with sucess', async () => {
		const result = await chai.request(app).get('/login/role')
		.set('Authorization', Authorization).send();
				
		expect(result.status).to.be.deep.equal(200);
  });

	it('Return /login/role with fail', async () => {
		const result = await chai.request(app).get('/login/role')
		.set('Authorization', `${Authorization}f`).send();
				
		expect(result.status).to.be.deep.equal(401);
  });

	it('Return /login/role with fail', async () => {
		const result = await chai.request(app).get('/login/role')
		.set('Authorization', '').send();
				
		expect(result.status).to.be.deep.equal(401);
  });

	it('Return /login/role with fail', async () => {
		const result = await chai.request(app).get('/login/role').send();
				
		expect(result.status).to.be.deep.equal(401);
  });
});

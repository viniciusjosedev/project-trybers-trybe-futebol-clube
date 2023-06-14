import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

import resultTeamFindAll from './mocks/resultTeamFindAll';

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

  it('Return teamFindAll', async () => {
		const result = await chai.request(app).get('/teams');
		
		expect(result.body).to.be.deep.equal(resultTeamFindAll);
  });

	it('Return teamFindById', async () => {
		const result = await chai.request(app).get('/teams/1');
		
		expect(result.body).to.be.deep.equal(resultTeamFindAll[0]);
  });
});

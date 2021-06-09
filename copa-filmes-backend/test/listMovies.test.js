/* eslint-env mocha */

require('dotenv').config();
const expect = require('chai').expect;
const moviesFunction = require('../functions/listMovies');

describe('List movies tests', () => {
  it('Expect a list of movies', async () => {
    const movies = await moviesFunction.handler({ MOCK: true });
    const body = JSON.parse(movies.body);

    expect(movies.statusCode).to.equal(200);
    expect(Array.isArray(body)).to.equal(true);
    expect(body.length).to.equal(16);
  })
})

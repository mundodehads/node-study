/* eslint-env mocha */

require('dotenv').config();
const expect = require('chai').expect;
const rankingFunction = require('../functions/generateMoviesRanking');
const listOfMoviesMock = require('./mock/listOfMovies');

describe('Ranking movies tests', () => {
  it('Given a list of 8 movies, expect the 1 and 2 winner of movies ratings ranking', async () => {
    const ranking = await rankingFunction.handler({
      MOCK: listOfMoviesMock,
      body: JSON.stringify({ selectedMovies: ['tt0317705', 'tt4881806', 'tt5164214', 'tt7784604', 'tt4154756', 'tt5463162', 'tt3778644', 'tt3501632'] }),
    });
    const body = JSON.parse(ranking.body);

    expect(ranking.statusCode).to.equal(200);
    expect(Array.isArray(body)).to.equal(true);
    expect(body.length).to.equal(2);
  })
})

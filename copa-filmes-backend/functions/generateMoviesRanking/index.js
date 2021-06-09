const Movies = require('../../models/movies');

async function getMoviesFromDb(mock) {
  return mock ? mock : Movies.scan().attributes(['id', 'title', 'rate']).exec();
}

 function compareRate(movieA, movieB) {
  if (movieA.rate === movieB.rate) {
    return movieA.title.localeCompare(movieB.title) === -1 ? movieA : movieB;
  }

  return movieA.rate > movieB.rate ? movieA : movieB;
}

async function createRanking(moviesFromDb, selectedMovies) {
  const eightfinals = moviesFromDb.filter(movie => selectedMovies.find(selectedMovie => selectedMovie === movie.id));

  eightfinals.sort((movieA, movieB) => movieA.title.localeCompare(movieB.title));

  const quarterfinals = [];
  quarterfinals.push(compareRate(eightfinals[0], eightfinals[7]));
  quarterfinals.push(compareRate(eightfinals[1], eightfinals[6]));
  quarterfinals.push(compareRate(eightfinals[2], eightfinals[5]));
  quarterfinals.push(compareRate(eightfinals[3], eightfinals[4]));

  const finalists = [];
  finalists.push(compareRate(quarterfinals[0], quarterfinals[1]));
  finalists.push(compareRate(quarterfinals[2], quarterfinals[3]));


  console.log({eightfinals, quarterfinals, finalists});

  return finalists.sort((movieA, movieB) => {
    if (movieA.rate === movieB.rate) {
      return movieA.title.localeCompare(movieB.title);
    }

    return movieA.rate > movieB.rate ? -1 : 1;
  });
}

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { selectedMovies } = body;

    const moviesFromDb = await getMoviesFromDb(event.MOCK);
    const ranking = await createRanking(moviesFromDb, selectedMovies);

    return {
      statusCode: 200,
      body: JSON.stringify(ranking),
    };
  } catch (error) {
    console.log({ error: JSON.stringify(error.stack) });
    return {
      statusCode: 500,
      body: error.message,
    };
  }
};

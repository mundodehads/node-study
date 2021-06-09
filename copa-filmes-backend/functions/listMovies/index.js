const Axios = require('axios').default;
const Movies = require('../../models/movies');

async function getMoviesFromApi() {
  const moviesFromApi = await Axios.get(process.env.MOVIES_API);

  return moviesFromApi.data || [];
}

async function getMoviesFromDb(mock) {
  return mock ? [] : Movies.scan().attributes(['id', 'title', 'year', 'rate']).exec();
}

async function writeMoviesOnDB(movies) {
  return Movies.batchPut(movies);
}

async function compareMovies(moviesFromApi, moviesFromDb, mock) {
  const newMovies = [];

  for (let apiMovie of moviesFromApi) {
    const movieInDb = moviesFromDb.find(dbMovie => dbMovie.id === apiMovie.id);
    if (!movieInDb) {
      newMovies.push({
        id: apiMovie.id,
        title: apiMovie.titulo,
        year: apiMovie.ano,
        rate: apiMovie.nota,
      });
    }
  }

  if (newMovies.length && !mock) {
    await writeMoviesOnDB(newMovies);
  }

  return moviesFromDb.concat(newMovies);
}

exports.handler = async (event) => {
  try {
    const moviesFromApi = await getMoviesFromApi();
    const moviesFromDb = await getMoviesFromDb(event.MOCK);
    const movies = await compareMovies(moviesFromApi, moviesFromDb, event.MOCK);

    return {
      statusCode: 200,
      body: JSON.stringify(movies),
    };
  } catch (error) {
    console.log({ error: JSON.stringify(error.stack) });
    return {
      statusCode: 500,
      body: error.message,
    };
  }
};

import ChuckNorrisJokesAPI from '../../infra/chucknorrisjokes';

async function getJoke() {
  const chuckNorrisJokesAPI = new ChuckNorrisJokesAPI();
  const response = await chuckNorrisJokesAPI.getChuckNorrisRandomJoke();

  if (response.status !== 200) {
    return '';
  }
  
  return response.data.value;
}

export const handler = async (event: any): Promise<any> => {
  try {
    const joke = await getJoke();

    return {
      body: JSON.stringify(joke),
      statusCode: 200,
    };
  } catch (error) {
    return {
      body: error.message,
      statusCode: 500,
    };
  }
};

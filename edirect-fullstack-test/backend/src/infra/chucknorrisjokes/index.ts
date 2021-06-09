import axios from "axios";

export default class ChuckNorrisJokesAPI {
  async getChuckNorrisRandomJoke(): Promise<any> {
    const response = await axios.get('https://api.chucknorris.io/jokes/random');
    return response;
  }
}
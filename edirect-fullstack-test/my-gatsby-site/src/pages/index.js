import React, { Component } from 'react';
import axios from 'axios';

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const BAD_WORDS = [
  'killed',
  'the',
];

const CACHE_SIZE = 10;

class IndexPage extends Component {
  constructor(props) {
      super(props);
      this.state = { message: '', messageCache: [] };
      this.handleClick = this.handleClick.bind(this);
      this.getMessage = this.getMessage.bind(this);
      this.getMessagesCache = this.getMessagesCache.bind(this);
      this.getMessagesCache();
    }

    async getChuckNorrisRandomJoke() {
      try {
        const response = await axios.get('https://api.chucknorris.io/jokes/random');
        return response;
      } catch {
        return { status: 500 };
      }
    }

    async getMessagesCache() {
      console.log('Updating cache...');
      const messageCachePromises = [];
      for (let x=0; x<CACHE_SIZE; x++) {
        messageCachePromises.push(this.getChuckNorrisRandomJoke());
      }

      await Promise.all(messageCachePromises).then(response => {
        this.setState(prevState => ({
          message: prevState.message,
          messageCache: prevState.messageCache.concat(response), 
        }));

        if (this.state.messageCache.length === response.length) {
          this.handleClick();
        }

        console.log('Cache updated with a length of ', this.state.messageCache.length);
      });
    }

    async getMessage() {
      const messageCache = this.state.messageCache; 
      let response;

      if (messageCache.length === 2) {
        this.getMessagesCache();
      }

      if (!messageCache.length) {
        return '';
      }

      response = messageCache.pop();

      this.setState(prevState => ({
        message: prevState.message,
        messageCache, 
      }));

      if (response.status !== 200) {
        return '';
      }

      return response.data.value;
    }

    hasBadWordsInsideJokes(message) {
      for (const badWord of BAD_WORDS) {
        if (message.toLowerCase().split(' ').find(word => word.replace(/[^a-zA-Z]+/g, '') === badWord)) {
          return true;
        }
      }

      return false;
    }

   async handleClick() {
    let message = await this.getMessage();
    console.log({message});

    if (this.hasBadWordsInsideJokes(message)) {
      this.handleClick();
    }

    this.setState(prevState => ({
      message,
      messageCache: prevState.messageCache, 
    }));
  }
  
  render() {
    return (
      <main style={pageStyles}>
        <title>Home Page</title>
        <button onClick={this.handleClick}>Show</button>
        <p>{this.state.message}</p>
      </main>
    );
  }
}

export default IndexPage;

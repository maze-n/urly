import React, { Component } from 'react';
import './components/post';
import './App.css';
import Post from './components/post';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  render() {
    return (
      <div className="App">
          <h1>Welcome to urly!</h1>
          <Post />
      </div>
    );
  }
}

export default App;

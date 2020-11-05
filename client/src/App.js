import React, { Component } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Spinner from './components/spinner';
import Message from './components/message';
import Popup from './components/popup';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      isLink: 'false',
      lifeTime: '60000',
      showPopup: false,
      warning: false,
      loading: false,
      url: ''
    };

  this.changeHandler = this.changeHandler.bind(this);
  this.submitHandler = this.submitHandler.bind(this);
  this.popupCloser = this.popupCloser.bind(this);
  }

  popupCloser() {
    this.setState({ showPopup: false });
  }

  validate = () => {
    let text = this.state.text;
    let isValid = true;

    if (!text) {
      isValid = false;
    }

    return isValid;
  }

  togglePopup() {  
    this.setState({ showPopup: !this.state.showPopup });  
  }  

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitHandler = async e => {
    e.preventDefault();

    if(this.validate()) {
      this.setState({ warning: false });
      const message = {
        text: this.state.text,
        isLink: this.state.isLink,
        lifeTime: parseInt(this.state.lifeTime, 10)
      }
      console.log(message);

      let res;
      try {
        this.setState({ loading: true });
          res = await Axios.post('http://localhost:5000/api/v1/messages/', message);
          this.setState({ text: "", loading: false });
      } catch(error) {
          console.log("Failed to send POST request");
      }

      if(res) {
          console.log(res.data.newMessage);
          this.setState({ showPopup: true, url: (window.location.href + res.data.newMessage._id) });
      }
    } else {
      this.setState({ warning: true, showPopup: false })
    }
}

  render() {
    const { text, isLink, lifeTime } = this.state;
    return (
      <div className="App">
          <Router>
          <Switch>
            <Route path="/:mid" component={Message} />
          <Route path="/">
          <h1 className="h1">Urly!</h1>
            <form onSubmit={ this.submitHandler }>
              <h2 className="h2">Create a disappearing 
                <select name="isLink" className="Link" value={ isLink } onChange={ this.changeHandler }>
                  <option value={ false }>message</option>
                  <option value={ true }>link</option>
                </select>
              </h2>
              <div>
                <input id="text" type="text" className="Input" name="text" value={ text } placeholder="Enter your message" onChange={ this.changeHandler } />
                <button name="submitButton" className="Button" onClick={this.submitHandler}>{this.state.loading ? <Spinner /> : "Generate"}</button>
              </div>
              <div>
                {this.state.warning ? <div className="Warning">Oops! No message was provided!</div> : ""}
              </div>
              <br></br>
              <div>
                Self-destruct Timer:
                <select name="lifeTime" className="Link" value={ lifeTime } onChange={ this.changeHandler }>
                  <option value="60000">1 Minute</option>
                  <option value="600000">10 Minutes</option>
                  <option value="3600000">1 Hour</option>
                  <option value="86400000">1 Day</option>
                  <option value="604800000">1 Week</option>
                </select>
              </div>
            </form>
            {this.state.showPopup ? <Popup text={this.state.url} popupCloser={this.popupCloser} /> : ""}
          </Route>
          </Switch>
          </Router>
      </div>
    );
  }
}

export default App;

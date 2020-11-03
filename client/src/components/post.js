import React, { Component } from 'react';
import Axios from 'axios';

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            isLink: 'false',
            lifeTime: '60000'
        };
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHandler = async e => {
        e.preventDefault();
        const message = {
            text: this.state.text,
            isLink: this.state.isLink,
            lifeTime: parseInt(this.state.lifeTime, 10)
        }
        console.log(message);

        Axios.post('http://localhost:5000/api/v1/messages/', message)
          .then((response) => { 
              console.log(response);
          }).catch((error) => {
              console.log(error);
          });
    }

    render() {
        const { text, isLink, lifeTime } = this.state;
        return(
            <div>
                 <form onSubmit={ this.submitHandler }>
                    <h2>Create a disappearing 
                        <select name="isLink" value={ isLink } onChange={ this.changeHandler }>
                            <option value={ false }>Message</option>
                            <option value={ true }>Link</option>
                        </select>
                    </h2>
                        Enter:
                        <input id="text" type="text" name="text" value={ text } onChange={ this.changeHandler } />
                    <input id="button" type="submit" value="Generate" />
                    <div>
                        Self-destruct Timer:
                        <select name="lifeTime" value={ lifeTime } onChange={ this.changeHandler }>
                            <option value="60000">1 Minute</option>
                            <option value="600000">10 Minutes</option>
                            <option value="3600000">1 Hour</option>
                            <option value="86400000">1 Day</option>
                            <option value="604800000">1 Week</option>
                        </select>
                    </div>
                </form>
            </div>
        )
    }
}

export default Post;
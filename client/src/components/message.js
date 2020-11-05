import React, { Component } from 'react';
import Axios from 'axios';

import './style.css';

class Message extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLink: false,
            messageText: "",
        };
    }

    async componentDidMount() {
        const mid = this.props.match.params.mid;
        const url = "http://localhost:5000/api/v1/messages/" + mid;

        let res;
        let status;
        try {
            res = await Axios.get(url);

            status = res.status;
            if(status === 200) {
                this.setState({ isLink: res.data.message.isLink, messageText: res.data.message.text });
                console.log(res.data.message.text);
            } else if(status === 206) {
                this.setState({ isLink: false, messageText: "Oops! This message was expired" });
            } else {
                this.setState({ isLink: false, messageText: "An unknown error occured. Please try again later." });
            }
        } catch(error) {
            console.log(error);
            status = error.response.status;
            
            if(status === 500) {
                console.log("Failed to fetch data from the server");
            } else if(status === 404) {
                this.setState({ isLink: false, messageText: "Could not find a message with the given link" });
            } else {
                this.setState({ isLink: false, messageText: "An unknown error occured. Please try again later." });
            }
        }
    }

    render() {
        return(
            <div className="Message">
                {this.state.isLink ? <div componentDidMount={ window.location.href=this.state.messageText } /> : this.state.messageText}
            </div>
        )
    }
}

export default Message;
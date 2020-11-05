import React, { Component } from 'react';

import CloseIcon from '../images/close.png';
import './style.css';

class Popup extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            copied: ""
        };

        this.copy = this.copy.bind(this);
    }

    copy() {
        navigator.clipboard.writeText(this.props.text)
        this.setState({ copied: "Copied to clipboard!" });
    }

    render() {
        return(
            <div className="Popup">
                <div className="close">
                    <img src={CloseIcon} height="20px" width="20px" onClick={this.props.popupCloser} />
                </div>
                <h1>Your message was created!</h1>
                <div className="url"><a href={this.props.text}>{this.props.text}</a></div>
                <button className="copy" onClick={this.copy}>Copy URL</button>
                <div>{this.state.copied}</div>
            </div>
        )
    }
}

export default Popup;
import React, { Component } from 'react';

import SpinIcon from '../images/spinner.png';
import './style.css';

class Spinner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            speed: 1
        }
    }
    render() {
        return (
            <div className="spinner">
                <img style={{animation: `spin ${this.state.speed}s linear infinite`}} src={SpinIcon} width="20px" height="20px"></img>
            </div>
        )
    }
}

export default Spinner;
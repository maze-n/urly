import React, { Component } from 'react';

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            isLink: '',
            lifeTime: ''
        };
    }

    render() {
        return(
            <div>
                <h2>Create a disappearing <select><option value="message">Message</option><option value="link">Link</option></select></h2>
                 <form>
                    <label>
                        Enter:
                        <input id="text" type="text" name="text" />
                    </label>
                <input id="button" type="submit" value="Generate" />
                </form>
                Self-destruct Timer:
                <select>
                    <option value="1m">1 Minute</option>
                    <option value="10m">10 Minutes</option>
                    <option value="1h">1 Hour</option>
                    <option value="1d">1 Day</option>
                    <option value="1w">1 Week</option>
                </select>
            </div>
        )
    }
}

export default Post;
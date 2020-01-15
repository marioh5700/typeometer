import React, { Component } from 'react';
import TypingModule from './TypingModule';

class MainComponent extends Component {
    constructor(props){
        super(props);
        this.state = {userId: null,
                    usernameValue: '',
                    passwordValue: ''};
        
        this.inputChange = this.inputChange.bind(this);
        this.submitUserDetails = this.submitUserDetails.bind(this);
    }

    inputChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    submitUserDetails() {
        console.log(this.state.usernameValue);
    }

    render() {
        if (this.state.userId === null) {
            return (
                <div>
                    <form action="">
                        <button
                        type="button"
                        onClick={this.submitUserDetails}
                        >Login</button>
                        <input name='usernameValue'
                        autoComplete="username"
                        type="text"
                        onChange={this.inputChange}
                        />
                        <input name="passwordValue"
                        autoComplete="current-password"
                        onChange={this.inputChange}
                        type={"password"}
                        />
                    </form>
                    <TypingModule/> 
                </div>
            )
        } else {
            return (
                <div>
                    <form>
                        <button
                        onClick={this.submitUserDetails}
                        >Login</button>
                        <input refs="usernameInput"
                            onChange={this.inputChange}
                        />
                        <input refs="passwordInput"
                            onKeyDown={this.inputChange}
                            type={"password"}
                        />
                    </form>
                    <TypingModule/> 
                </div>
            )
        }
    }
}

export default MainComponent;
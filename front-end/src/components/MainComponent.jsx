import React, { Component } from 'react';
import TypingModule from './TypingModule';

class MainComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
        loggedIn: false,
        usernameValue: '',
        passwordValue: ''};
        
        this.inputChange = this.inputChange.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.register = this.register.bind(this);
    }

    componentDidMount() {
        this.checkLogged();
    }

    inputChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    register() {
        console.log(this.state.usernameValue);
    }

    login() {
        let params = {
            username: this.state.usernameValue,
            password: this.state.passwordValue
          };

        fetch('http://localhost:5000/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(params)
        })
        .then(res => res.json())
        .then((response) => {
            this.setState({loggedIn: response});
        });
    }

    logout() {
        fetch('http://localhost:5000/logout', {
            credentials: 'include'
        })
        .then(res => res.json())
        .then((res) => {
            this.setState({loggedIn: res})
        })
    }

    checkLogged() {
        fetch('http://localhost:5000/checkLogged', {
            credentials: 'include'
        })
        .then(res => res.json())
        .then((results) => {
            this.setState({loggedIn: results});
        })
    }

    render() {
        let loggedIn = this.state.loggedIn;
        let navBar = ''
        if (this.state.loggedIn === false) {
            navBar =    <form id='formContainer' action="">
                            <button
                            type="button"
                            onClick={this.login}
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
        } else {
            navBar = <form id='formContainer' action=''>
                        <button
                        type="button"
                        onClick={this.logout}
                        >Logout</button>                
                    </form>
        }

        return (
            <div>
                {navBar}
                <TypingModule
                loggedIn={loggedIn}/> 
            </div>
        )
    }
}

export default MainComponent;
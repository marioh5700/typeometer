import React, { Component } from 'react';
import TypingModule from './TypingModule';
import logo from './Speedometer.png';

class MainComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
        loggedIn: false,
        usernameValue: '',
        passwordValue: '',
        popup: false};
        
        this.inputChange = this.inputChange.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.register = this.register.bind(this);
        this.loginPopup = this.loginPopup.bind(this);
    }

    componentDidMount() {
        this.checkLogged();
    }

    inputChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    loginPopup() {
        if (this.state.popup === true) {
            document.getElementById('id01').style.display='none';
            this.setState({popup: false});
        } else {
            document.getElementById('id01').style.display='block';
            this.setState({popup: true});
        }
    }

    register() {
        let params = {
            username: this.state.usernameValue,
            password: this.state.passwordValue
          };

        fetch('http://localhost:5000/register', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(params)
        })
        .then(() => {
            console.log('success');
        });
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
            this.setState({loggedIn: response,
            popup: false});
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
            navBar =    <div className='navContainer'>
                            <img className='icon' src={logo}/>
                            <button 
                            className='btn'
                            onClick={this.loginPopup}>
                                <span>LOGIN</span>
                            </button>
                        </div>

        } else {
            navBar = <form className='navContainer' action=''>
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
                <div id="id01" className="modal">
                    <span onClick={this.loginPopup}
                    className="close" title="Close Modal">&times;</span>

                        <form className="modal-content animate formContainer" action="/action_page.php">
                            <div className="imgcontainer">
                                <img src="img_avatar2.png" alt="Avatar" className="avatar"></img>
                            </div>

                            <div className="container">
                                <label htmlFor="usernameValue"><b>Username</b></label>
                                <input placeholder="Enter Username" name='usernameValue'
                                autoComplete="username"
                                type="text"
                                onChange={this.inputChange} required></input>

                                <label htmlFor="passwordValue"><b>Password</b></label>
                                <input name="passwordValue"
                                autoComplete="current-password"
                                onChange={this.inputChange}
                                type={"password"}></input>

                                <button type="button"
                                onClick={this.login}>Login</button>
                            </div>

                            <div className="container" id="cancelContainer">
                                <button type="button" onClick={this.loginPopup} className="cancelbtn">Cancel</button>
                            </div>
                        </form>
                    </div>             
            </div>
        )
    }
}

export default MainComponent;
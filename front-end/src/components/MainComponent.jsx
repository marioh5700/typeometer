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
        popup: false,
        validForm: false};
        
        this.inputChange = this.inputChange.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.register = this.register.bind(this);
        this.loginPopup = this.loginPopup.bind(this);
    }

    inputChange(event) {
        this.setState({[event.target.name]: event.target.value}, () => {
            if (this.state.usernameValue === '' || this.state.passwordValue === '') {
                this.setState({validForm: false});
            } else {
                this.setState({validForm: true});
            }
        });
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
        if (this.state.validForm){
            let params = {
                username: this.state.usernameValue,
                password: this.state.passwordValue
            };

            fetch('https://typeometer-backend.herokuapp.com/register', {
                method: 'POST',
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(params)
            })
            .then(res => res.json())
            .then((response) => {
                if (response) {
                    alert('Success');
                } else {
                    alert('Username Already Exists');
                }
            });
        }
    }

    login() {
        if (this.state.validForm){
            let params = {
                username: this.state.usernameValue,
                password: this.state.passwordValue
              };
    
            fetch('https://typeometer-backend.herokuapp.com/login', {
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
                if (!response) {
                    alert('Username or Password Incorrect');
                } else {
                    document.getElementById('id01').style.display='none';
                }
            });
        }
    }

    logout() {
        fetch('https://typeometer-backend.herokuapp.com/logout', {
            credentials: 'include'
        })
        .then(res => res.json())
        .then((res) => {
            this.setState({loggedIn: res})
        })
    }

    checkLogged() {
        fetch('https://typeometer-backend.herokuapp.com/checkLogged', {
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
        let popup = this.state.popup;
        if (this.state.loggedIn === false) {
            navBar =    <div className='navContainer'>
                            <img className='icon' src={logo} alt='logo'/>
                            <button 
                            className='btn'
                            onClick={this.loginPopup}>
                                <span>LOGIN</span>
                            </button>
                        </div>

        } else {
            navBar = <div className='navContainer' action=''>
                        <img className='icon' src={logo} alt='logo'/>
                        <button
                        type="button"
                        className='btn'
                        onClick={this.logout}
                        ><span>LOGOUT</span></button>                
                    </div>
        }

        return (
            <div>
                {navBar}
                <TypingModule
                logout={this.logout}
                popup={popup}
                loggedIn={loggedIn}/>    
                <div id="id01" className="modal">
                    <span onClick={this.loginPopup}
                    className="close" title="Close Modal">&times;</span>

                        <form className="modal-content animate formContainer" action="/action_page.php">
                            <div className="imgcontainer">
                                <img className='icon' src={logo} alt='logo'/>
                            </div>

                            <div className="container">
                                <label htmlFor="usernameValue"><span className='popupLogin'>Username</span></label>
                                <input placeholder="Enter Username" name='usernameValue'
                                autoComplete="username"
                                type="text"
                                onChange={this.inputChange} required></input>

                                <label htmlFor="passwordValue"><span className='popupLogin'>Password</span></label>
                                <input name="passwordValue"
                                placeholder="Enter Password"
                                autoComplete="current-password"
                                onChange={this.inputChange}
                                type={"password"}></input>

                                <button type="button"
                                className="modal-login"
                                onClick={this.login}><span className='popupLogin'>LOGIN</span></button>
                                <button type="button"
                                className="modal-login"
                                onClick={this.register}><span className='popupLogin'>REGISTER</span></button>
                            </div>

                            <div className="container" id="cancelContainer">
                                <button type="button" onClick={this.loginPopup} className="cancelbtn"><span className="popupLogin">CANCEL</span></button>
                            </div>
                        </form>
                    </div>             
            </div>
        )
    }
}

export default MainComponent;
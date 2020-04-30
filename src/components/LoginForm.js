import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class LoginForm extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            user: '',
            password: '',
            signedIn: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signIn = this.signIn.bind(this);
    }
  
    async signIn() {
      const { username, password } = this.state; 
      try{

        await Auth.signIn({
          username: username,
          password: password
        });

        alert('successfully signed in')

        this.setState({
          username: '',
          password: '',
          signedIn: true
        });

      } catch (error){

        alert(`Error signing in: ${ error.message }`)
      }

    }
    
    handleSubmit(e) {
        e.preventDefault();

        this.signIn();

        e.target.reset();
    }
  
    handleChange(e) {
        if (e.target.id === 'username') {
          this.setState({
              username: e.target.value
          });
        } else if (e.target.id === 'password') {
          this.setState({
              password: e.target.value
          });
        }
    }
  
    render() {
      const { signedIn } = this.state;
      if (signedIn) {
          return (
              <div>
                  <h1>You have signed in!</h1>
              </div>
          );
      } else {
        return (
          <div>
            <h1>Login </h1>
            <form onSubmit={ this.handleSubmit }>
                <label>Username</label>
                <br />
                <input id='username' type='text' onChange={ this.handleChange }/>
                <br />
                <label>Password</label>
                <br />
                <input id='password' type='password' onChange={ this.handleChange }/>
                <br />
                <br />
                <button>Sign In</button>
            </form>
          </div>
        );
      }
    }
}

export default LoginForm;
import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            username: '',
            password: '',
            phone_number: '',
            email: '',
            confirmationCode: '',
            verified: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signUp = this.signUp.bind(this);
        this.confirmSignUp = this.confirmSignUp.bind(this);
    }
  
    async signUp() {
      const { username, password, email, phone_number } = this.state;  

      try {

        await Auth.signUp({
            username: username,
            password: password,
            attributes: {
                email: email,
                phone_number: phone_number
            }
        })

        alert('Successfully signed up');

        this.setState({
          password: '',
          email: '',
          phone_number: '',
          verified: true
        });

      } catch (error){ 
        console.log(error)
        alert(`Error signing up: ${ error.message }`)
      }

    }
  
    async confirmSignUp() {
        const { username, confirmationCode } = this.state;
        
        try {

          await Auth.confirmSignUp(username, confirmationCode);
          alert('Successfully confirmed signed up')

          this.setState({
             confirmationCode: '',
             username: ''
          });

          this.props.handleSignup();

        } catch (error){

          alert(`Error confirming sign up - ${ error.message }`);

        }

    }
  
    handleSubmit(e) {
      const { verified } = this.state;
  
        e.preventDefault();
  
        if (verified) {
          this.confirmSignUp();

        } else {
          this.signUp();

        }
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
        } else if (e.target.id === 'phone_number') {
          this.setState({
              phone_number: e.target.value
          });
        } else if (e.target.id === 'email') {
          this.setState({
              email: e.target.value
          });
        } else if (e.target.id === 'confirmationCode') {
          this.setState({
              confirmationCode: e.target.value
          });
        }
    }
  
    render() {
      const { verified } = this.state;
      if (verified) {
          return (
            <div>
              <form onSubmit={ this.handleSubmit }>
                  <label>Confirmation Code</label>
                  <input id='confirmationCode' type='text' onChange={ this.handleChange }/>
                  <button>Confirm Sign up</button>
              </form>
            </div>
          );
      } else {
        return (
          <div>
            <h1>Sign Up</h1>
            <form onSubmit={ this.handleSubmit }>
                <label>Username</label>
                <br />
                <input id='username' type='text' onChange={ this.handleChange }/>
                <br />
                <label>Password</label>
                <br />
                <input id='password' type='password' onChange={ this.handleChange }/>
                <br />
                <label>Phone Number</label>
                <br />
                <input id='phone_number' type='text' onChange={ this.handleChange }/>
                <br />
                <label>Email</label>
                <br />
                <input id='email' type='text' onChange={ this.handleChange }/>
                <br />
                <br />
                <button>Sign up</button>
            </form>
          </div>
        );
      }
    }
}

export default SignUpForm;
import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter
  } from "react-router-dom";
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

class Main extends Component{
 
    constructor (props){
        super(props);

        this.state = {
            signedUp : false
        }
        this.handleSignup = this.handleSignup.bind(this);
    }


    handleSignup() {
        this.setState({
            signedUp: true
        });
    }

    render(){
        return (
          <div className="Main">
              <Router>
                <Switch>
                    <Route exact path="/" component={LoginForm}/>
                    <Route exact path="/signup">
                        <SignUpForm handleSignup={ this.handleSignup }/>
                    </Route>
                </Switch>
              </Router>
          </div>
        )
    }
}
export default withRouter(Main);
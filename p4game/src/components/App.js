import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navigation from './Navigation';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import AccountPage from './Account';
import withAuthentication from './withAuthentication';

import * as routes from '../constants/routes';
import { firebase } from '../firebase';
import './App.css';
import axios from 'axios';

const API_ID = process.env.API_ID;
const API_KEY = process.env.API_KEY;
class App extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     authUser: null,
  //   };
  // }

  // componentDidMount() {
  //   firebase.auth.onAuthStateChanged(authUser => {
  //     authUser
  //       ? this.setState(() => ({ authUser }))
  //       : this.setState(() => ({ authUser: null }));
  //   });
  // }
  state ={
    info:{},
    twitch:[],
  }
  getTwitch = async (game) => {
    await axios.get(`https://api.twitch.tv/kraken/search/streams?q=${game}&limit=100&offset=0&client_id=${API_ID}`)
    .then((res => res.json())
    .then((res) => {
      let twitch = [...res.data]
      this.setState[{twitch}]
    }))
  }

  getIGDB = async (game) => {
    await axios.get(`https://www.giantbomb.com/api/search?json_callback=JSON_CALLBACK&api_key=${API_KEY}&format=json&resources=game&limit=1&query=${game}`)
    .then((res => res.json())
    .then((res) => {
      let info = [...res.data]
      this.setState({info});
    }))
  }

  render() {
    return (
      <div className="App">
        <Router>
        <div>
        {/* <Navigation  /> */}

      {/* <hr/> */}

      <Route
        exact path={routes.LANDING}
        component={() => <LandingPage />}
      />
      <Route
        exact path={routes.SIGN_UP}
        component={() => <SignUpPage />}
      />
      <Route
        exact path={routes.SIGN_IN}
        component={() => <SignInPage />}
      />
      <Route
        exact path={routes.PASSWORD_FORGET}
        component={() => <PasswordForgetPage />}
      />
      <Route
        exact path={routes.HOME}
        component={() => <HomePage />}
      />
      <Route
        exact path={routes.ACCOUNT}
        component={() => <AccountPage />}
      />
    </div>
        </Router>
      </div>
    );
  }
}

export default withAuthentication(App);

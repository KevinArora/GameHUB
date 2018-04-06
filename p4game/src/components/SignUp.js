import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth, db } from '../firebase';
import {SignInLink} from './SignIn';
import * as routes from '../constants/routes';
import './css/SignIn.css'
import './css/SignUp.css'
import Logo from '../GAMELIB.png';
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});
const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
const SignUpPage = ({history}) =>
<div>
<img className="gamelib" src={Logo}/>
  <div className="bevel">
    <h1 className="white">New? Sign Up</h1>
    <SignUpForm history={history} />
    <SignInLink/>
  </div>
  </div>

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
      } = this.state;

      const {
        history,
        } = this.props;
    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        db.doCreateUser(authUser.uid, username, email)
        .then(() => {
          this.setState(() => ({ ...INITIAL_STATE }));
          history.push(routes.HOME);
        })
        .catch(error => {
          this.setState(byPropKey('error', error));
        });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
    }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
      } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div className="containers">
      <div className="card card-container">
      <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />   
      <form onSubmit={this.onSubmit}>
      <span id="reauth-email" className="reauth-email"></span>
        <input
          className="form-control"
          value={username}
          onChange={event => this.setState(byPropKey('username', event.target.value))}
          type="text"
          placeholder="Full Name"
        />
        
        <input
          className="form-control"
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input
          className="form-control"
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <input
          className="form-control"
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        />
        <button className="btn btn-lg btn-primary btn-block btn-signin" disabled={isInvalid} type="submit">
          Sign Up
        </button>

        { error && <p>{error.message}</p> }
      </form>
      </div>
      </div>
    );
  }
}

const SignUpLink = () =>
  <p className="white">
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};
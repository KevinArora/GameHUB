import React, { Component } from 'react';
import { withRouter,Link } from 'react-router-dom';
import { PasswordForgetLink } from './PasswordForget';
import { SignUpLink } from './SignUp';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import './css/SignIn.css'
import Logo from '../GAMELIB.png';
const SignInPage = ({ history }) =>
  <div>
  <img className="gamelib" src={Logo}/>
  
  <div className="bevel">
    <h1 className="white">Log In</h1>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <div className="containers">
      <div className="card card-container">
      {/* <!-- <img class="profile-img-card" src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120" alt="" /> --> */}
            <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
      <form className="form-signin" onSubmit={this.onSubmit}>
      <span id="reauth-email" className="reauth-email"></span>
        <input
          className="form-control"
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input
          className="form-control"
          value={password}
          onChange={event => this.setState(byPropKey('password', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <div id="remember" className="checkbox">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me 
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block btn-signin" disabled={isInvalid} type="submit">
          Sign In
        </button>

        { error && <p>{error.message}</p> }
      </form>
    
      </div>
      </div>
    );
  }
}

const SignInLink =() =>
<p className="white">Have an account? <b/>
<Link to='signin'>Sign In </Link>
</p>
export default withRouter(SignInPage);

export {
  SignInForm,
  SignInLink,
};
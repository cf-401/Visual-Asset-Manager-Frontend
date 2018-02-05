import React from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';

import { connect } from 'react-redux';
import { renderIf } from '../../lib/helper-functions/render-if';

import LogIn from './log-in';

import * as actions from '../../state/auth/actions';
import AuthType from '../../state/auth/type';

class LogInContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.renderUserInfo = this.renderUserInfo.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentWillMount() {
    this.props.handleLogin();
  }

  logOut() {
    cookie.remove('auth');
    this.props.handleLogout();
  }

  renderUserInfo() {
    const { auth } = this.props;
    if (!auth.user) {
      return null;
    }
    return (
      <div>
        <p>{auth.user.username}</p>
        <button onClick={this.logOut}>Log Out</button>
      </div>
    );
  }

  render() {
    const { auth, handleLogin, handleCreateAccount } = this.props;
    console.log(auth);
    return (
      <React.Fragment>
        {renderIf(
          !auth.user,
          <LogIn submit={handleLogin} create={handleCreateAccount} />,
        )}
        {this.renderUserInfo()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  handleLogin: user => dispatch(actions.authLogin(user)),
  handleLogout: () => dispatch(actions.authLogout()),
  handleCreateAccount: user => dispatch(actions.authCreateAccount(user)),
});

LogInContainer.propTypes = {
  auth: PropTypes.shape(AuthType).isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleCreateAccount: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInContainer);

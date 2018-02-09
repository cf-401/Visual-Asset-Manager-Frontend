import React from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';

import { connect } from 'react-redux';
import { renderIf } from '../../lib/helper-functions/render-if';

import LogIn from './log-in';
import * as actions from '../../state/auth/actions';
import AuthType from '../../state/auth/type';
import FileDataContainer from '../file-data/FileDataContainer';

class LogInContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      init: true,
      formType: 'signin',
    };

    this.renderUserInfo = this.renderUserInfo.bind(this);
    this.logOut = this.logOut.bind(this);
    this.toggleFormType = this.toggleFormType.bind(this);
  }

  componentWillMount() {
    this.props.handleLogin()
      .then(() => this.setState({ init: false }));
  }

  logOut() {
    cookie.remove('auth');
    this.props.handleLogout();
  }

  toggleFormType(e) {
    if (e.target.name !== this.state) {
      this.setState({ formType: e.target.name });
    }
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
    const {
      auth,
      handleLogin,
      handleCreateAccount,
    } = this.props;
    if (this.state.init) { return null; }

    return (
      <React.Fragment>
        {renderIf(
          !auth.user,
          <React.Fragment>
            <LogIn
              create={handleCreateAccount}
              login={handleLogin}
              formType={this.state.formType}
            />
            <button onClick={this.toggleFormType} name="signin">Log in (existing user)</button>
            <button onClick={this.toggleFormType} name="signup">Sign up (new user)</button>
            <a href="https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=21630512897.312261919794"><img alt="Sign in with Slack" height="40" width="172" src="https://platform.slack-edge.com/img/sign_in_with_slack.png" srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" /></a>
          </React.Fragment>,
        )}

        {this.renderUserInfo()}
        <FileDataContainer />
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
  handleLogout: PropTypes.func.isRequired,
  handleCreateAccount: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInContainer);

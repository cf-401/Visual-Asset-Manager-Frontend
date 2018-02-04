import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import authState from '../../state/auth';

import AuthForm from '../../components/auth-form';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.renderChildren = this.renderChildren.bind(this);
    this.renderAuthForm = this.renderAuthForm.bind(this);

    this.state = { init: true };
  }

  componentWillMount() {
    this.props.authLogin()
      .then(() => this.setState({ init: false }));
  }

  renderAuthForm() {
    const { auth } = this.props;
    return auth.user ?
      null : (<AuthForm handleCreate={this.props.authCreate} handleLogin={this.props.authLogin} />);
  }

  renderChildren() {
    const { auth, children } = this.props;
    return auth.user ? children : null;
  }

  render() {
    if (this.state.init) { return null; }
    return (
      <React.Fragment>
        {this.renderChildren()}
        {this.renderAuthForm()}
      </React.Fragment>

    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  authLogin: user => dispatch(authState.actions.authLogin(user)),
  authCreate: user => dispatch(authState.actions.authCreateAccount(user)),
  authLogout: () => dispatch(authState.actions.authLogout()),
});

Auth.propTypes = {
  children: PropTypes.node.isRequired,
  authLogin: PropTypes.func.isRequired,
  authCreate: PropTypes.func.isRequired,
  authLogout: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    user: PropTypes.shape(authState.type),
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

import React from 'react';
import { connect } from 'react-redux';

import LogIn from '../log-in/log-in';
import { renderIf } from '../../lib/helper-functions/render-if';
import SignInModal from '../signin-modal/signin-modal-container';
import Logo from '../header/logo';

import * as actions from '../../state/auth/actions';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.renderUserName = this.renderUserName.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  toggleModal() {
    if (!this.state.showModal) {
      this.setState({ showModal: true });
    }
    if (this.state.showModal) {
      this.setState({ showModal: false });
    }
  }

  logOut() {
    cookie.remove('auth');
    this.props.handleLogout();
  }


  renderUserName() {
    const { auth } = this.props;
    if (!auth.user) {
      return null;
    }
    return (
      <React.Fragment>
        <ul className="navList">
          <li>{auth.user.username}
            <ul className="navList">
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/">Home</Link></li>
              <li onClick={this.logOut}><Link to="/">Log Out</Link></li>
            </ul>
          </li>
        </ul>
      </React.Fragment>
    );
  }


  render() {
    return (
      <header>
        <div><Logo width="50" height="50" /></div>
        <ul className="navList">
          {renderIf(
          !this.props.auth.user,
            <li>
            Guest
              <ul>
                <li onClick={this.toggleModal}>Log In</li>
              </ul>
            </li>,
          )}
          {this.renderUserName()}
        </ul>

        {renderIf(
          this.state.showModal,
          <SignInModal toggleModal={this.toggleModal} />,
        )}
      </header>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});
const mapDispatchToProps = dispatch => ({
  handleLogout: () => dispatch(actions.authLogout()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);

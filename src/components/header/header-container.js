import React from 'react';
import { connect } from 'react-redux';

import LogIn from '../log-in/log-in';
import { renderIf } from '../../lib/helper-functions/render-if';
import SignInModal from '../signin-modal/signin-modal-container';

import './header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
    };
    this.renderUserName = this.renderUserName.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    if (!this.state.showModal) {
      this.setState({ showModal: true });
    }
    if (this.state.showModal) {
      this.setState({ showModal: false });
    }
  }

  renderUserName() {
    const { auth } = this.props;
    if (!auth.user) {
      return null;
    }
    return (
      <React.Fragment>
        <li>{auth.user.username}</li>
      </React.Fragment>
    );
  }


  render() {
    return (
      <div className="header">
        <h1>VAM</h1>
        <ul>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});
const mapDispatchToProps = dispatch => ({ });
export default connect(mapStateToProps, mapDispatchToProps)(Header);

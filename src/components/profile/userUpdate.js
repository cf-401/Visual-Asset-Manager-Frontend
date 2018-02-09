import React from 'react';
import PropTypes from 'prop-types';

class UserUpdate extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeOfEmail = this.onChangeOfEmail.bind(this);
    this.onChangeOfUsername = this.onChangeOfUsername.bind(this);
    this.onChangeOfGroup = this.onChangeOfGroup.bind(this);
    this.onChangeOfAboutMe = this.onChangeOfAboutMe.bind(this);
    this.onChangeOfPassword = this.onChangeOfPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    const { user } = this.props;
    this.state = { ...user };
  }

  onChangeOfEmail(event) {
    event.preventDefault();
    this.setState({ email: event.target.value });
  }

  onChangeOfGroup(event) {
    event.preventDefault();
    this.setState({ group: event.target.value });
  }
  onChangeOfUsername(event) {
    event.preventDefault();
    this.setState({ username: event.target.value });
  }

  onChangeOfAboutMe(event) {
    event.preventDefault();
    this.setState({ aboutMe: event.target.value });
  }

  onChangeOfPassword(event) {
    event.preventDefault();
    this.setState({ password: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onComplete(Object.assign({}, this.state));
  }

  render() {
    return (
      <React.Fragment>
        <form className="userForm" onSubmit={this.onSubmit}>
          <div className="usernameForm">
            <label id="username">
            change your username
            </label>
            <input
              htmlFor="username"
              value={this.state.username}
              onChange={this.onChangeOfUsername}
            />
          </div>
          <br />
          <div className="passwordForm">
            <label id="password">
            change your password
            </label>
            <input
              htmlFor="password"
              type="password"
              value={this.state.password}
              onChange={this.onChangeOfPassword}
            />
          </div>
          <br />
          <div className="emailForm">
            <label id="email">
          change your email
            </label>
            <input
              htmlFor="email"
              value={this.state.email}
              onChange={this.onChangeOfEmail}
            />
          </div>
          <br />
          <div className="groupForm">
            <label id="group">
            change your group
            </label>
            <input
              htmlFor="group"
              value={this.state.group}
              onChange={this.onChangeOfGroup}
            />
          </div>
          <div className="aboutMeForm">
            <label id="about">
          change your about me
            </label>
            <textarea
              rows="10"
              htmlFor="about"
              className="aboutMeInput"
              value={this.state.aboutMe}
              onChange={this.onChangeOfAboutMe}
            />
          </div>
          <br />
          <button type="submit"> submit </button>
          <br />
          <button
            className="deleteButton"
            type="submit"
            onClick={() => this.props.delete()}
          >
          delete account
          </button>
        </form>
      </React.Fragment>
    );
  }
}

UserUpdate.propTypes = {
  user: PropTypes.shape({}).isRequired,
};

export default UserUpdate;

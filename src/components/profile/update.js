import React from 'react';

class UserUpdate extends React.Component {
  constructor(props) {
    super(props);



    this.onChangeOfPassword = this.onChangeOfPassword.bind(this);
    this.onChangeOfUsername = this.onChangeOfUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: this.props.auth.username,
      password: this.props.auth.password,
    };
  }

  onChangeOfPassword(event) {
    event.preventDefault();
    this.setState({ username: event.target.value });
  }

  onChangeOfUsername(event) {
    event.preventDefault();
    this.setState({ password: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.update(Object.assign({}, this.state));
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          {this.state.username}
          <input
            value={this.state.username}
            onChange={this.onChangeOfUsername}
          />
          {this.state.password}
          <input
            value={this.state.password}
            onChangeOfPassword={this.onChangeOfPassword}
          />
          <button
          type="submit"
          onClick={() => this.props.delete(this.props.auth._id)}>
          delete account
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default UserUpdate;

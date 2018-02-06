import React from 'react';

class UserUpdate extends React.Component {
  constructor(props) {
    super(props);



    this.onChangeOfEmail = this.onChangeOfEmail.bind(this);
    this.onChangeOfUsername = this.onChangeOfUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: this.props.auth.user.username,
      email: this.props.auth.user.email,
    };
  }

  onChangeOfEmail(event) {
    event.preventDefault();
    this.setState({ email: event.target.value });
  }

  onChangeOfUsername(event) {
    event.preventDefault();
    this.setState({ username: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.update(Object.assign({}, this.state));
  }

  render() {
    console.log(this.props.auth.user.password);
    return (
      <React.Fragment>
        <h2> Welcome {this.state.username} </h2>
        <br />
        <form onSubmit={this.onSubmit}>
          <label id="username">
          change your username
          </label>
          <input
            htmlFor="username"
            value={this.state.username}
            onChange={this.onChangeOfUsername}
          />
          <br />
          <label id="password">
          change your email
          </label>
          <input
            htmlFor="password"
            value={this.state.email}
            type="password"
            onChange={this.onChangeOfEmail}
          />
          <button type="submit"> submit </button>
        </form>
        <button
        type="submit"
        onClick={() => this.props.delete()}>
        delete account
        </button>
      </React.Fragment>
    );
  }
}

export default UserUpdate;

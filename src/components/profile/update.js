import React from 'react';

class UserUpdate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.auth.username,
      password: this.props.auth.password,
    };
  }

  render() {
    return (
      <React.Fragment>
        <form>
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
        </form>
      </React.Fragment>
    );
  }
}

export default UserUpdate;

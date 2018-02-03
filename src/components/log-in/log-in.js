import React from 'react';

class LogIn extends React.Componenet {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <div className="log-in">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="email">Email:
              <input type="text" id="email" onChange={this.handleChange} required />
            </label>
            <label htmlFor="password">Password:
              <input type="password" id="password" onChange={this.handleChange} required />
            </label>
            <input type="submit" value="Log In" />
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default LogIn;

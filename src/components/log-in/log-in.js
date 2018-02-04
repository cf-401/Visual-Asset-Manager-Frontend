import React from 'react';

class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submit(this.state);
  }

  handleCreate() {
    if (this.state.email && this.state.password) {
      let email = this.state.email;
      this.state.username = email;
      this.props.create(Object.assign({}, this.state));
    }
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
          <button onClick={this.handleCreate}>Create Profile</button>
        </div>
      </React.Fragment>
    );
  }
}

export default LogIn;

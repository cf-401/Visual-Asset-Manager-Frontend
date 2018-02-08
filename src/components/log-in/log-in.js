import React from 'react';
import PropTypes from 'prop-types';

class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderSignInForm = this.renderSignInForm.bind(this);
    this.renderSignUpForm = this.renderSignUpForm.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.props.toggleModal();
    const { formType, create, login } = this.props;
    const formSubmitMapping = {
      signup: create,
      signin: login,
    };

    if (!this.state.username) {
      return this.setState(
        { username: this.state.email.split('@')[0] },
        () => formSubmitMapping[formType](this.state),
      );
    }
    return formSubmitMapping[formType](this.state);
  }

  renderSignInForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="email">Email:
          <input type="text" id="email" onChange={this.handleChange} required />
        </label>
        <label htmlFor="password">Password:
          <input type="password" id="password" onChange={this.handleChange} required />
        </label>
        <input type="submit" value="Log In" />
      </form>
    );
  }

  renderSignUpForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="email">Email:
          <input type="text" id="email" onChange={this.handleChange} required />
        </label>
        <label htmlFor="password">Password:
          <input type="password" id="password" onChange={this.handleChange} required />
        </label>
        <label htmlFor="username">Display Name (optional):
          <input type="text" id="username" onChange={this.handleChange} />
        </label>
        <input type="submit" value="Sign Up" />
      </form>
    );
  }

  render() {
    const { formType } = this.props;
    const formViewMapping = {
      signup: this.renderSignUpForm,
      signin: this.renderSignInForm,
    };

    return (
      formViewMapping[formType]()
    );
  }
}

LogIn.propTypes = {
  create: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  formType: PropTypes.string.isRequired,
};

export default LogIn;

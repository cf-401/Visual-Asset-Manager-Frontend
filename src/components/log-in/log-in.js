import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;
console.log(Form.Item);
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
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('email', {
           rules: [{ required: true, message: 'Please input your username!' }],
         })(<Input
           onChange={this.handleChange}
           prefix={<Icon type="email" style={{ color: 'rgba(0,0,0,.25)' }} />}
           placeholder="Email"
         />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(<Input
            id="password"
            onChange={this.handleChange}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            p
            placeholder="Password"
          />)}
        </FormItem>
        <Button type="primary" htmlType="submit">Log in</Button >
      </Form>
    );
  }

  renderSignUpForm() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('email', {
         rules: [{ required: true, message: 'Please input your username' }],
       })(<Input
         onChange={this.handleChange}
         prefix={<Icon type="email" style={{ color: 'rgba(0,0,0,.25)' }} />}
         placeholder="Email"
       />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
        </FormItem>
        <Button type="primary" htmlType="submit">Sign up</Button >
      </Form>
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

export default Form.create()(LogIn);

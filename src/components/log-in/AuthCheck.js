import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AuthCheck extends React.Component {
  render() {
    const { auth } = this.props;
    if (!auth.user) {
      return null;
    }
    return (
      this.props.children
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

AuthCheck.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
};

export default connect(mapStateToProps)(AuthCheck);

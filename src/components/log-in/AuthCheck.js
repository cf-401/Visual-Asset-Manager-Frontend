import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AuthCheck extends React.Component {
  render() {
    const { auth, children } = this.props;
    if (!auth.user) {
      return null;
    }
    return (
      { children }
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

AuthCheck.propTypes = {
  auth: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps)(AuthCheck);

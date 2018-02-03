import React from 'react';
import { connect } from 'react-redux';
import { renderIf } from '../../lib/helper-functions/render-if';

import LogIn from './log-in';

class LogInContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      {renderIf(
        !this.props.auth.username,
        <LogIn />
      )}
      {renderIf(
        this.props.auth.username,
        <p>{this.props.auth.username}</p>
      )}
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch, getState) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(LogInContainer);

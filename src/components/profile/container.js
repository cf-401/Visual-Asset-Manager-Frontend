import React from 'react';
import { connect } from 'react-redux';
import UserUpdate from './update';
import LogInContainer from '../log-in/log-in-container';

import * as actions from '../../state/auth/actions';

class Profile extends React.Component {

  render() {
    if (!this.props.auth.user) {
      return null;
    }
    console.log(this.props.auth.user.username);
    return (
      <React.Fragment>
        <LogInContainer>
          <UserUpdate
            update={this.props.userUpdate}
            delete={this.props.userDelete}
            auth={this.props.auth}
          />
        </LogInContainer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch, getState) => ({
  userUpdate: user => dispatch(actions.userUpdate(user)),
  userDelete: user => dispatch(actions.userDelete(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

import React from 'react';
import { connect } from 'react-redux';
import UserUpdate from './update';
import LogInContainer from '../log-in/log-in-container';

import * as actions from '../../state/auth/actions';

class Profile extends React.Component {


  componentWillMount() {
    this.props.userLogin();
  }

  render() {
    const { auth } = this.props;
    if (!auth.user) {
      return null;
    }
    return (
      <React.Fragment>
          <UserUpdate
            update={this.props.userUpdate}
            delete={this.props.userDelete}
            auth={this.props.auth}
          />
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
  userLogin: user => dispatch(actions.authLogin(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

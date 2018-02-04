import React from 'react';
import { connect } from 'react-redux';
import UserUpdate from './update';

import * as actions from '../../state/auth/actions';

class Profile extends React.Component {

  render() {
    return (
      <React.Fragment>
        <UserUpdate
          create={this.props.userCreate}
          update={this.props.userUpdate}
          delete={this.props.userDelete}
          auth={this.props.auth}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth.user,
});

const mapDispatchToProps = (dispatch, getState) => ({
  userCreate: user => dispatch(actions.authCreateAccount(user)),
  userUpdate: user => dispatch(actions.userUpdate(user)),
  userDelete: user => dispatch(actions.userDelete(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

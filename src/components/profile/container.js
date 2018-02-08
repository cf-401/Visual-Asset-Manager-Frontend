import React from 'react';
import { connect } from 'react-redux';
import UserUpdate from './userUpdate';

import * as actions from '../../state/auth/actions';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.editToggle = this.editToggle.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.state = {
      isEditing: false,
    };
  }

  componentWillMount() {
    this.props.userLogin();
  }

  onComplete(newState) {
    this.props.userUpdate(newState);
  }

  editToggle(event) {
    event.preventDefault();
    this.setState({ isEditing: !this.state.isEditing });
  }

  render() {
    const { auth } = this.props;
    if (!auth.user) {
      return null;
    }
    console.log(this.props.auth.user.group);
    return (
      <div className="landingUserPage">
        <h2 className="welcomeHeader"> Welcome {this.props.auth.user.username} </h2>
        <div className="userInfo">
          <React.Fragment>
            <UserUpdate
              onComplete={this.onComplete}
              editToggle={this.editToggle}
              delete={this.props.userDelete}
              user={this.props.auth.user}
            />
          </React.Fragment>
        </div>
      </div>
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

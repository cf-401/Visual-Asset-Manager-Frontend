import React from 'react';
import { connect } from 'react-redux';
import UserUpdate from './userUpdate';

import FileList from './fileList';

import * as actions from '../../state/auth/actions';
import * as fileActions from '../../state/file-data/actions';

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
    this.props.fileDataInitialize();
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
          <FileList
            fileData={this.props.fileData}
            user={this.props.auth.user}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  fileData: state.fileData,
});

const mapDispatchToProps = dispatch => ({
  userUpdate: user => dispatch(actions.userUpdate(user)),
  userDelete: user => dispatch(actions.userDelete(user)),
  userLogin: user => dispatch(actions.authLogin(user)),
  fileDataInitialize: () => dispatch(fileActions.init()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

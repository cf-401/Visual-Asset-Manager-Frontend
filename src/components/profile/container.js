import './profile.scss';
import React from 'react';
import { connect } from 'react-redux';
import UserUpdate from './userUpdate';
import FileList from './fileList';
import FileData from '../file-data/FileDataContainer';

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

  editToggle(event) {
    event.preventDefault();
    this.setState({ isEditing: !this.state.isEditing });
  }

  onComplete(newState) {
    this.props.userUpdate(newState);
  }

  render() {
    const { auth } = this.props;
    if (!auth.user) {
      return null;
    }
    console.log(this.props.fileData);
    return (
      <div className="landingUserPage">
        <h2 className="welcomeHeader"> Welcome {this.props.auth.user.username} </h2>
        <div className="userInfo">
          <React.Fragment>
            <UserUpdate
              onComplete={this.onComplete}
              editToggle={this.editToggle}
              delete={this.props.userDelete}
              auth={this.props.auth}
            />
          </React.Fragment>
          <FileData />
          <FileList
            fileData={this.props.fileData}
            auth={this.props.auth}
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

const mapDispatchToProps = (dispatch, getState) => ({
  userUpdate: user => dispatch(actions.userUpdate(user)),
  userDelete: user => dispatch(actions.userDelete(user)),
  userLogin: user => dispatch(actions.authLogin(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

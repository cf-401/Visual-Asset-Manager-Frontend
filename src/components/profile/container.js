import './profile.scss';
import React from 'react';
import { connect } from 'react-redux';
import UserUpdate from './userUpdate';
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
    return (
      <div>
        { !this.state.isEditing ? (
          <div className="landingUserPage">
            <h2 className="landingHeaderWords"> Welcome {this.props.auth.user.username} </h2>
            <React.Fragment>
              <div className="userInfo">
                <p className="usernameLanding"> username: {this.props.auth.user.username} </p>
                <p className="emailLanding"> email: {this.props.auth.user.email} </p>
                <br />
                <button type="submit" onClick={this.editToggle}> edit profile </button>
              </div>
              <div className="uploadForm">
                <FileData />
              </div>
            </React.Fragment>
          </div>
      ) : (
        <React.Fragment>
          <UserUpdate
            onComplete={this.onComplete}
            editToggle={this.editToggle}
            delete={this.props.userDelete}
            auth={this.props.auth}
          />
        </React.Fragment>
    )
    }
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

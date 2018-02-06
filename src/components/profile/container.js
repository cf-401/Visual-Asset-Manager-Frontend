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

  render() {
    const { auth } = this.props;
    if (!auth.user) {
      return null;
    }
    return (
      <div>
        { !this.state.isEditing ? (
          <React.Fragment>
            <button type="submit" onClick={this.editToggle}> edit profile </button>
            <FileData />
          </React.Fragment>
      ) : (
        <React.Fragment>
          <UserUpdate
            editToggle={this.editToggle}
            update={this.props.userUpdate}
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

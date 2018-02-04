import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import fileDataState from '../../state/file-data';
import authState from '../../state/auth';

import Auth from '../log-in/AuthCheck';
import FileDataForm from './FileDataForm';
import FileDataDisplay from './FileDataDisplay';

class FileDataContainer extends React.Component {
  componentWillMount() {
    const { fileDataInitialize } = this.props;
    fileDataInitialize();
  }

  render() {
    const {
      user,
      fileDataCreate,
      fileDataArray,
      fileDataDelete,
      fileDateUpdate,
    } = this.props;

    return (
      <div>
        <Auth>
          <FileDataForm submitHandler={fileDataCreate} type="creator" user={user} />
        </Auth>
        <FileDataDisplay
          toDisplay={fileDataArray}
          fileDataDelete={fileDataDelete}
          fileDateUpdate={fileDateUpdate}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fileDataArray: state.fileData,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  fileDataCreate: fileData => dispatch(fileDataState.actions.uploadImage(fileData)),
  fileDataDelete: id => dispatch(fileDataState.actions.remove(id)),
  fileDataInitialize: () => dispatch(fileDataState.actions.init()),
  fileDateUpdate: fileData => dispatch(fileDataState.actions.updateImage(fileData)),
});

FileDataContainer.propTypes = {
  fileDataInitialize: PropTypes.func.isRequired,
  fileDataArray: PropTypes.arrayOf(PropTypes.shape(fileDataState.type)).isRequired,
  fileDataCreate: PropTypes.func.isRequired,
  fileDataDelete: PropTypes.func.isRequired,
  fileDateUpdate: PropTypes.func.isRequired,
  user: PropTypes.shape(authState.type),
};

FileDataContainer.defaultProps = {
  user: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(FileDataContainer);

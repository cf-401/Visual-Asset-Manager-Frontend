import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import fileDataState from '../../state/file-data';
import authState from '../../state/auth';

import FilterSelector from '../filtering/FilterSelector';
import AuthCheck from '../log-in/AuthCheck';
import FileDataForm from './FileDataForm';
import FileDataDisplay from './FileDataDisplay';

class FileDataContainer extends React.Component {
  componentWillMount() {
    const { fileDataInitialize } = this.props;
    fileDataInitialize();
  }

  render() {
    const {
      auth,
      fileDataArray,
      fileDataDelete,
      fileDateUpdate,
      fileDataCreate,
    } = this.props;

    return (
      <div>
        <AuthCheck>
          <FileDataForm submitHandler={fileDataCreate} type="creator" user={auth.user} />
        </AuthCheck>
        <FilterSelector />
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
  auth: state.auth,
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
  auth: PropTypes.shape(authState.type),
};

FileDataContainer.defaultProps = {
  auth: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(FileDataContainer);

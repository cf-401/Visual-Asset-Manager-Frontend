import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import fileDataState from '../../state/file-data';
import selections from '../../state/selections';
import authState from '../../state/auth';

import FilterSelector from '../filtering/FilterSelector';
import AuthCheck from '../log-in/AuthCheck';
import FileDataForm from './FileDataForm';
import FileDataDisplay from './FileDataDisplay';

class FileDataContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.auth,
    };
  }
  componentWillMount() {
    const { labelInitialize } = this.props;
    labelInitialize();
  }

  componentWillReceiveProps(newProps) {
    const { fileDataInitialize } = this.props;
    if (this.state.auth && this.state.auth.init && newProps.auth.user) {
      fileDataInitialize();
      this.setState({ auth: newProps.auth.user });
    }
  }

  render() {
    const {
      auth,
      fileDataArray,
      fileDataDelete,
      fileDateUpdate,
      fileDataCreate,
      makeNewLabel,
      updateCurrentFilters,
      allFilters,
    } = this.props;

    return (
      <div>
        <AuthCheck>
          <FileDataForm
            submitHandler={fileDataCreate}
            type="creator"
            user={auth.user}
            allLabels={allFilters}
            makeNewLabel={makeNewLabel}
          />
        </AuthCheck>
        <FilterSelector updateCurrentFilters={updateCurrentFilters} allFilters={allFilters} />
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
  fileDataArray: fileDataState.selectors.getFilteredData(state),
  auth: state.auth,
  allFilters: selections.selectors.getAllLabels(state),
});

const mapDispatchToProps = dispatch => ({
  fileDataCreate: fileData => dispatch(fileDataState.actions.uploadImage(fileData)),
  fileDataDelete: id => dispatch(fileDataState.actions.remove(id)),
  fileDataInitialize: () => dispatch(fileDataState.actions.init()),
  fileDateUpdate: fileData => dispatch(fileDataState.actions.updateImage(fileData)),
  makeNewLabel: label => dispatch(selections.actions.create(label)),
  updateCurrentFilters: filters => dispatch(selections.actions.update(filters)),
  labelInitialize: () => dispatch(selections.actions.init()),
});

FileDataContainer.propTypes = {
  fileDataInitialize: PropTypes.func.isRequired,
  fileDataArray: PropTypes.arrayOf(PropTypes.shape(fileDataState.type)).isRequired,
  fileDataCreate: PropTypes.func.isRequired,
  fileDataDelete: PropTypes.func.isRequired,
  fileDateUpdate: PropTypes.func.isRequired,
  makeNewLabel: PropTypes.func.isRequired,
  allFilters: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  auth: PropTypes.shape(authState.type),
  updateCurrentFilters: PropTypes.func.isRequired,
  labelInitialize: PropTypes.func.isRequired,
};

FileDataContainer.defaultProps = {
  auth: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(FileDataContainer);

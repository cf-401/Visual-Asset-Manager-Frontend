import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import fileDataState from '../../state/file-data';
import selections from '../../state/selections';

import FilterSelector from '../filtering/FilterSelector';
import FileDataDisplay from './FileDataDisplay';

class FileDataContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
    };
  }
  componentWillMount() {
    const { labelInitialize } = this.props;
    labelInitialize();
  }

  componentWillReceiveProps(newProps) {
    const { fileDataInitialize } = this.props;
    const { user } = this.state;
    const { auth } = newProps;
    if (!user && auth.user) {
      // first login
      fileDataInitialize();
      this.setState({ user: auth.user });
    }
    if (user && auth.init) {
      // log out
      this.setState({ user: false });
    }
  }

  render() {
    const {
      fileDataArray,
      fileDataDelete,
      fileDateUpdate,
      updateCurrentFilters,
      allFilters,
      makeNewLabel,
    } = this.props;

    return (
      <div>
        <FilterSelector updateCurrentFilters={updateCurrentFilters} allFilters={allFilters} />
        <FileDataDisplay
          toDisplay={fileDataArray}
          fileDataDelete={fileDataDelete}
          fileDateUpdate={fileDateUpdate}
          allFilters={allFilters}
          auth={this.props.auth}
          makeNewLabel={makeNewLabel}
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
  fileDataDelete: PropTypes.func.isRequired,
  fileDateUpdate: PropTypes.func.isRequired,
  allFilters: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  updateCurrentFilters: PropTypes.func.isRequired,
  labelInitialize: PropTypes.func.isRequired,
  auth: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FileDataContainer);

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import AssetCard from '../form-components/AssetCard';
import FileDataForm from './FileDataForm';

import { FileDataType } from '../../state/file-data/type';

class FileDataDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event) {
    const { fileDataDelete } = this.props;
    fileDataDelete(event.target.id);
  }

  render() {
    const { toDisplay, fileDateUpdate } = this.props;
    return (
      <ul className="file-data-container">
        {toDisplay.map(item =>
          (
            <li key={item._id}>
              <FontAwesome
                className="delete-button"
                role="button"
                tabIndex={0}
                onClick={this.handleDelete}
                id={item._id}
                name="times"
              />
              <h4>{item.name}
              </h4>
              <AssetCard item={item} submitHandler={fileDateUpdate} type="updater" />
            </li>))}
      </ul>
    );
  }
}

FileDataDisplay.propTypes = {
  toDisplay: PropTypes.arrayOf(PropTypes.shape(FileDataType)).isRequired,
  fileDataDelete: PropTypes.func.isRequired,
  fileDateUpdate: PropTypes.func.isRequired,
};

export default FileDataDisplay;

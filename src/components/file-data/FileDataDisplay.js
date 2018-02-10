/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import AssetCard from '../form-components/AssetCard';

import { FileDataType } from '../../state/file-data/type';

const isOwnerOfAsset = (item, auth) => {
  if (!auth.user || !item.userId) {
    return false;
  }
  if (auth.user._id === item.userId._id) {
    return true;
  }
  return false;
};

class FileDataDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.renderDeleteButton = this.renderDeleteButton.bind(this);
  }

  handleDelete(e) {
    const { fileDataDelete } = this.props;
    e.preventDefault();
    fileDataDelete(e.target.id);
  }


  renderDeleteButton(item, auth) {
    if (isOwnerOfAsset(item, auth)) {
      return (
        <FontAwesome
          className="delete-button"
          role="button"
          tabIndex={0}
          onClick={this.handleDelete}
          id={item._id}
          name="times"
        />
      );
    }
    return null;
  }

  render() {
    const { toDisplay, fileDateUpdate, auth } = this.props;
    return (
      <ul className="file-data-container">
        {toDisplay.map(item =>
          (
            <li key={item._id}>
              {this.renderDeleteButton(item, auth)}
              <h4>{item.name}
              </h4>
              <AssetCard
                item={item}
                submitHandler={fileDateUpdate}
                type="updater"
                isOwnerOfAsset={isOwnerOfAsset(item, auth)}
              />
            </li>
          ))}
      </ul>
    );
  }
}

FileDataDisplay.propTypes = {
  toDisplay: PropTypes.arrayOf(PropTypes.shape(FileDataType)).isRequired,
  fileDataDelete: PropTypes.func.isRequired,
  fileDateUpdate: PropTypes.func.isRequired,
  auth: PropTypes.shape({}),
};

FileDataDisplay.defaultProps = {
  auth: { init: true },
};

export default FileDataDisplay;

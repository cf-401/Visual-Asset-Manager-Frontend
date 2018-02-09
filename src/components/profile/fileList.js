import React from 'react';
import AssetCard from '../form-components/AssetCard';

class FileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(props) {
    const filteredFiles = props.fileData.filter((file) => {
      if (!file.userId) {
        return false;
      }
      return file.userId._id === props.user._id;
    });
    this.setState({ filteredFiles });
  }

  render() {
    return (
      <div>
        <ul>
          {
            this.state.filteredFiles && this.state.filteredFiles.map(file => (
              <AssetCard item={file} type="updater" />

            ))
          }
        </ul>
      </div>
    );
  }
}

export default FileList;

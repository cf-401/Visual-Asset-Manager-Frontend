import React from 'react';
import FileDataDisplay from '../file-data/FileDataDisplay';

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
    if (!this.state.filteredFiles) {
      return null
    }
    return (
      <div className="mappedItems">
        <FileDataDisplay toDisplay={this.state.filteredFiles} />
      </div>
    );
  }
}

export default FileList;

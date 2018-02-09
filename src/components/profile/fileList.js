import React from 'react';
import AssetCard from '../form-components/AssetCard';

class FileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(props) {
    const filteredFiles = props.fileData.filter(file => file.userId._id === props.user._id);
    this.setState({ filteredFiles });
  }

  render() {
    return (
      <div>
        <ul>
          {
<<<<<<< HEAD
            this.state.filteredFiles && this.state.filteredFiles.map( (file,i) => (
              <li key={file._id}>
                <h3> {file.description} </h3>
                <img src={file.path}/>
              </li>
=======
            this.state.filteredFiles && this.state.filteredFiles.map(file => (
              <AssetCard item={file} type="updater" />

>>>>>>> cbd43afa72b23a249143baf4f89a833a5f0c2f20
            ))
          }
        </ul>
      </div>
    );
  }
}

export default FileList;

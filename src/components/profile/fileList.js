import React from 'react';
import UserUpdate from './userUpdate';

class FileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillReceiveProps(props) {
    let filteredFiles = props.fileData.filter( file => {
      return file.userId._id === props.auth.user._id
    });
    this.setState({ filteredFiles })
  }

  render() {
    console.log('state', this.state);
    return (
      <div>
        <ul>
          {
            this.state.filteredFiles && this.state.filteredFiles.map( (file,i) => (
              <li key={file._id}>
                <h3> {file.description} </h3>
                <img src={file.path}/>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default FileList;

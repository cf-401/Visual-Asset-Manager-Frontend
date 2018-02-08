import React from 'react';
import UserUpdate from './userUpdate';

class FileList extends React.Component {
  constructor(props) {
    super(props);
    this.filterUser = this.filterUser.bind(this);
    this.state = {}
  }

  filterUser() {
    return this.props.fileData.filter( file => {
      if(!this.props.auth.user){
        return false;
      }
    return file.userId._id === this.props.auth.user._id
  })
}

  render() {
    return(
      <div>
        <ul>
          {
            this.filterUser().map( (file,i) => {
              <li key={file.userId._id}>
                {file}
              </li>
            })
          }
        </ul>
      </div>
    )
  }
}

export default FileList;

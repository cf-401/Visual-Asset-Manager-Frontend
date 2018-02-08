import React from 'react';
import UserUpdate from './userUpdate';

class FileList extends React.Component {
  constructor(props) {
    super(props);
    this.filterUser = this.filterUser.bind(this);
    this.state = {}
  }

  filterUser() {
    console.log(this.props.auth.user);
    return this.props.fileData.filter( file => {
      if(!this.props.auth.user){
        return false;
      }
      let result = file.userId._id === this.props.auth.user._id
      console.log(result);
    return result
  })
}

  render() {
    console.log('props', this.props);
    return(
      <div>
        <ul>
          {
            this.filterUser().map( (file,i) => {
              <li key={file.userId._id}>
              <h1> shit </h1>
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

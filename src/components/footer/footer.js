import React from 'react';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <ul className="table">
          <li>Created By: </li>
          <li><a href="https://github.com/jrzollin" target="_blank">James</a></li>
          <li>, </li>
          <li><a href="https://github.com/truecounterfeit" target="_blank">Kelati</a></li>
          <li>, </li>
          <li><a href="https://github.com/meganrm" target="_blank">Megan</a></li>
          <li> & </li>
          <li><a href="https://github.com/RyleeAndrews"target="_blank">Rylee</a></li>
          <li>.</li>
        </ul>
      </React.Fragment>
    );
  }
}

export default Footer;

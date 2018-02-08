import React from 'react';
import { connect } from 'react-redux';

import LogIn from '../log-in/log-in';
import { renderIf } from '../../lib/helper-functions/render-if';

import './header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // init: true,
      // formType: 'signin',
    };
  }

  render() {
    return (
      <div className="header">
        <h1>VAM</h1>
        <ul>
          {renderIf(

          !this.props.auth.user,
            <li>Guest</li>,

        )}
          {renderIf(
          this.props.auth.user,
            <li>this.props.auth.username</li>,
        )}
        </ul>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});
const mapDispatchToProps = dispatch => ({ });
export default connect(mapStateToProps, mapDispatchToProps)(Header);

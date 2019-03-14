/* eslint-disable */

import React, { PureComponent } from 'react';

import {buttonStyle, buttonLogoStyle, buttonBlockStyle} from '../style/Styles.js';

class LaunchButton extends PureComponent {


  render() {

    return (
      <button style={buttonStyle} onClick={this.props.action} disabled={!this.props.enabled}>
      <span>Launch Playbook</span>
      </button>
    );
  }
}

export default LaunchButton;

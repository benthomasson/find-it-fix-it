/* eslint-disable */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import asyncComponent from '../../Utilities/asyncComponent';
import './sample-page.scss';

import { Section, Main, PageHeader, PageHeaderTitle } from '@red-hat-insights/insights-frontend-components';

import { Button } from '@patternfly/react-core';

import LaunchButton from './button/Launch.js';
import Controller from './logic.js';
import Host from './Host.js';
import Playbook from './Playbook.js';
import Log from './Log.js';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import {blockStyle, headerStyle} from './style/Styles.js';

library.add(faCheck);
library.add(faTimes);

const SampleComponent = asyncComponent(() => import('../../PresentationalComponents/SampleComponent/sample-component'));
// const PageHeader2 = asyncComponent(() => import('../../PresentationalComponents/PageHeader/page-header'));
// const PageHeaderTitle2 = asyncComponent(() => import('../../PresentationalComponents/PageHeader/page-header-title'));

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */
class SamplePage extends Component {

  constructor(props) {
    super(props);
    window.svgFrame = this;
    this.controller = new Controller(this);
  }
  shouldComponentUpdate (nextProps, nextState) {
    return true;
  }
  componentDidMount() {
    this.controller.init();
  }

    render() {

    var hosts = [];
    for (var i = 0; i < this.controller.hosts.length; i++) {
      var host = this.controller.hosts[i];
      var tasks = this.controller.tasks_by_host[host.host_id];
      if (tasks === undefined) {
        tasks = [];
      }
      hosts.push(<Host {...host} tasks={tasks} key={host.name} />);
    }
        return (
            <React.Fragment>
                <PageHeader>
                    <PageHeaderTitle title='Find-It-Fix-It'/>
                </PageHeader>
                <Main>
                  <Playbook {...this.controller.playbook} />
                  <div style={blockStyle}>
                  <div style={headerStyle}>Actions</div>
                  <LaunchButton action={this.controller.launch} enabled={this.controller.launch_enabled}/>
                  </div>
                  <div style={blockStyle}>
                  <div style={headerStyle}>Tasks</div>
                  <ul>
                  {hosts}
                  </ul>
                  </div>
                  <div style={blockStyle}>
                  <div style={headerStyle}>Log</div>
                  <Log lines={this.controller.log} />
                  </div>
                </Main>
            </React.Fragment>
        );
    }
}

export default withRouter(SamplePage);

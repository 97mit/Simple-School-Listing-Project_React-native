import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import SwipeablePanel from 'rn-swipeable-panel';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swipeablePanelActive: false,
    };
  }

  componentDidMount = () => {
    this.openPanel();
  };

  openPanel = () => {
    this.setState({swipeablePanelActive: true});
  };

  closePanel = () => {
    this.setState({swipeablePanelActive: false});
  };

  render() {
    return (
      <SwipeablePanel
        fullWidth
        isActive={this.state.swipeablePanelActive}
        onClose={this.closePanel}
        onPressCloseButton={this.closePanel}>
        <Text>Hey</Text>
      </SwipeablePanel>
    );
  }
}

import React from 'react';
import { Platform, StyleSheet, UIManager } from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export class App extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  componentDidMount() {
    /* TODO:
      - Enable LayoutAnimation on Android, on top of this file (prefix: LayoutAnimation)
      - Import the startLayoutAnimation helper method (prefix: LayoutAnimation)
    */
    await startLayoutAnimation(
      /*TODO:config*/,
      /*TODO:optional_onConfigured_handler*/,
    );
  }

  render() {
    return null;
  }
}

const styles = StyleSheet.create({});

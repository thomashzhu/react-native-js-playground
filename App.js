import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createAppContainer } from 'react-navigation';

import { RootTabNavigation } from './src/navigation/RootTabNavigation';

const AppContainer = createAppContainer(RootTabNavigation);

export default () => (
  <View style={styles.container}>
    <AppContainer />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

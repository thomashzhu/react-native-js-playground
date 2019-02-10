import React from 'react';
import {
  Button, Platform, SafeAreaView, StyleSheet,
} from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';

class _HomeScreen extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  handleButtonPress = () => {
    const { navigation } = this.props;
    navigation.navigate('Feed');
  };

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Button onPress={this.handleButtonPress} title="HomeScreen" />
      </SafeAreaView>
    );
  }
}

const statusBarHeight = Platform.OS === 'ios' && parseInt(Platform.Version, 10) >= 11 ? 0 : Constants.statusBarHeight;

const styles = StyleSheet.create({
  safeAreaView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: statusBarHeight,
  },
});

export default (() => {
  const mapStateToProps = state => ({
    profile: state.profile,
  });

  const mapDispatchToProps = {
    
  };

  return connect(mapStateToProps, mapDispatchToProps)(_HomeScreen);
})();

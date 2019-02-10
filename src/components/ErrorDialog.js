import React from 'react';
import {
  Animated, ColorPropType, StyleSheet, Text, View, ViewPropTypes,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

export class ErrorDialog extends React.Component {
  static propTypes = {
    autoDismissInterval: PropTypes.number,
    backgroundColor: ColorPropType.isRequired,
    error: PropTypes.string,
    onDismiss: PropTypes.func.isRequired,
    style: ViewPropTypes.style,
    tintColor: ColorPropType.isRequired,
    visible: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    autoDismissInterval: null,
    error: '',
    style: {},
  };

  opacity = new Animated.Value(0);

  componentDidMount() {
    this.showErrorDialog();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) this.showErrorDialog();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  showErrorDialog = () => {
    Animated.timing(this.opacity, {
      duration: 350,
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      this.startTimer();
    });
  };

  startTimer = () => {
    const { autoDismissInterval, onDismiss } = this.props;

    if (autoDismissInterval && autoDismissInterval > 0) {
      this.stopTimer();

      this.intervalId = setInterval(() => {
        onDismiss();
      }, autoDismissInterval);
    }
  };

  stopTimer = () => {
    if (this.intervalId) clearInterval(this.intervalId);
  };

  render() {
    const {
      backgroundColor, onDismiss, error, style, tintColor, visible,
    } = this.props;

    if (!error || !visible) return null;

    const dynamicStyle = {
      backgroundColor,
      opacity: this.opacity,
    };

    const tintStyle = {
      color: tintColor,
    };

    /* prettier-ignore */
    return (
      <Animated.View style={[styles.container, style, dynamicStyle]}>
        <Text style={[styles.errorText, tintStyle]}>{error}</Text>

        <View style={styles.iconContainer}>
          <MaterialIcons
            name="close"
            size={24}
            onPress={onDismiss}
            style={tintStyle}
          />
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    margin: 16,
    padding: 16,
    position: 'absolute',
    zIndex: 1,
  },
  iconContainer: {
    marginLeft: 8,
  },
  errorText: {
    flex: 1,
    lineHeight: 22,
  },
});

import React from 'react';
import {
  Animated, ColorPropType, TouchableWithoutFeedback, ViewPropTypes,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

export class CircleButton extends React.Component {
  static propTypes = {
    backgroundColor: ColorPropType.isRequired,
    buttonSize: PropTypes.number.isRequired,
    iconColor: ColorPropType.isRequired,
    iconSize: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    style: ViewPropTypes.style.isRequired,
  };

  scale = new Animated.Value(1);

  handlePressIn = () => {
    Animated.timing(this.scale, {
      toValue: 0.85,
      duration: 120,
      useNativeDriver: true,
    }).start();
  };

  handlePressOut = () => {
    Animated.timing(this.scale, {
      toValue: 1,
      duration: 120,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const {
      backgroundColor, buttonSize, iconColor, iconSize, name, onPress, style,
    } = this.props;

    const containerStyle = {
      alignItems: 'center',
      backgroundColor: `${backgroundColor}`,
      borderRadius: buttonSize / 2,
      height: buttonSize,
      justifyContent: 'center',
      transform: [{ scale: this.scale }],
      width: buttonSize,
    };

    const iconStyle = {
      color: `${iconColor}`,
      transform: [{ scale: this.scale }],
    };

    const AnimatedMaterialIcons = Animated.createAnimatedComponent(MaterialIcons);

    /* prettier-ignore */
    return (
      <TouchableWithoutFeedback
        onPress={onPress}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
      >
        <Animated.View
          elevation={8}
          style={[containerStyle, style]}
        >
          <AnimatedMaterialIcons
            name={name}
            size={iconSize}
            style={iconStyle}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

import React from 'react';
import { ColorPropType, View } from 'react-native';
import PropTypes from 'prop-types';

export const Divider = ({
  color, horizontal, padding, size, spacing,
}) => {
  const sharedStyle = {
    backgroundColor: `${color}`,
  };

  if (horizontal) {
    const horizontalStyle = {
      height: size,
      marginHorizontal: padding,
      marginVertical: spacing,
    };
    return <View style={[sharedStyle, horizontalStyle]} />;
  }

  const verticalStyle = {
    width: size,
    marginVertical: padding,
    marginHorizontal: spacing,
  };
  return <View style={[sharedStyle, verticalStyle]} />;
};

Divider.propTypes = {
  color: ColorPropType,
  horizontal: PropTypes.bool,
  padding: PropTypes.number,
  size: PropTypes.number,
  spacing: PropTypes.number,
};

Divider.defaultProps = {
  color: '#848484',
  horizontal: true,
  padding: 0,
  size: 1,
  spacing: 0,
};

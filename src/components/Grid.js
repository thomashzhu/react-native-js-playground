import React from 'react';
import {
  Dimensions, FlatList, PixelRatio, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

export class Grid extends React.Component {
  static propTypes = {
    itemMargin: PropTypes.number,
    numColumns: PropTypes.number.isRequired,
    renderItem: PropTypes.func.isRequired,
  };

  static defaultProps = {
    itemMargin: StyleSheet.hairlineWidth,
  };

  renderGridItem = (info) => {
    const { index } = info;
    const { itemMargin, numColumns, renderItem } = this.props;

    const { width } = Dimensions.get('window');

    const size = PixelRatio.roundToNearestPixel(
      (width - itemMargin * (numColumns - 1)) / numColumns,
    );

    const marginLeft = index % numColumns === 0 ? 0 : itemMargin;

    const marginTop = index < numColumns ? 0 : itemMargin;

    return renderItem({
      ...info,
      marginLeft,
      marginTop,
      size,
    });
  };

  render() {
    /* prettier-ignore */
    return (
      <FlatList
        {...this.props}
        renderItem={this.renderGridItem}
      />
    );
  }
}

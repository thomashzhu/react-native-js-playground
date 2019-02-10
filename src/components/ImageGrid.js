import React from 'react';
import {
  Alert, CameraRoll, Image, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Permissions } from 'expo';
import PropTypes from 'prop-types';

import { Grid } from './Grid';

export class ImageGrid extends React.Component {
  static propTypes = {
    numColumns: PropTypes.number.isRequired,
    onPressImage: PropTypes.func,
  };

  static defaultProps = {
    onPressImage: () => {},
  };

  cursor = null;

  loading = false;

  state = {
    images: [],
  };

  componentDidMount() {
    this.getImages();
  }

  getImages = async (after) => {
    if (this.loading) return;

    this.loading = true;

    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status !== 'granted') {
      Alert.alert('Camera roll permission denied');
      return;
    }

    const results = await CameraRoll.getPhotos({
      first: 20,
      after,
    });

    const {
      edges,
      page_info: { end_cursor: endCursor, has_next_page: hasNextPage },
    } = results;

    const loadedImages = edges.map(item => item.node.image);

    this.setState(
      ({ images }) => ({
        images: images.concat(loadedImages),
      }),
      () => {
        this.loading = false;
        this.cursor = hasNextPage ? endCursor : null;
      },
    );
  };

  getNextImages = () => {
    if (!this.cursor) return;

    this.getImages(this.cursor);
  };

  renderItem = (info) => {
    const {
      item: { uri },
      marginLeft,
      marginTop,
      size,
    } = info;
    const { onPressImage } = this.props;

    const style = {
      height: size,
      marginLeft,
      marginTop,
      width: size,
    };

    /* prettier-ignore */
    return (
      <TouchableOpacity
        activeOpacity={0.75}
        key={uri}
        onPress={() => onPressImage(uri)}
        style={style}
      >
        <Image
          source={{ uri }}
          style={styles.image}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const { numColumns } = this.props;
    const { images } = this.state;

    /* prettier-ignore */
    return (
      <Grid
        data={images}
        keyExtractor={item => item.uri}
        numColumns={numColumns}
        onEndReached={this.getNextImages}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});

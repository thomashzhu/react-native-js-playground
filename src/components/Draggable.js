import React from 'react';
import { PanResponder } from 'react-native';
import PropTypes from 'prop-types';

export class Draggable extends React.Component {
  static propTypes = {
    /* prettier-ignore */
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    enabled: PropTypes.bool,
    onTouchStart: PropTypes.func.isRequired,
    onTouchMove: PropTypes.func.isRequired,
    onTouchEnd: PropTypes.func.isRequired,
  };

  static defaultProps = {
    enabled: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onMoveShouldSetPanResponderCapture: this.handleMoveShouldSetPanResponderCapture,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    });
  }

  handleStartShouldSetPanResponder = () => {
    const { enabled } = this.props;

    return enabled;
  };

  handlePanResponderGrant = () => {
    const { onTouchStart } = this.props;

    this.setState(
      {
        dragging: true,
      },
      () => onTouchStart(),
    );
  };

  /* prettier-ignore */
  handleMoveShouldSetPanResponderCapture = (e, gestureState) => (
    gestureState.dx !== 0 && gestureState.dy !== 0
  );

  handlePanResponderMove = (e, gestureState) => {
    const { onTouchMove } = this.props;

    const offset = {
      left: gestureState.dx,
      top: gestureState.dy,
    };

    onTouchMove(offset);
  };

  handlePanResponderEnd = (e, gestureState) => {
    const { onTouchMove, onTouchEnd } = this.props;

    const offset = {
      left: gestureState.dx,
      top: gestureState.dy,
    };

    this.setState(
      {
        dragging: false,
      },
      () => {
        onTouchMove(offset);
        onTouchEnd(offset);
      },
    );
  };

  render() {
    const { children } = this.props;
    const { dragging } = this.state;

    return children({
      dragging,
      handlers: this.panResponder.panHandlers,
    });
  }
}

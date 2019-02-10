import React from 'react';
import { Keyboard, Platform } from 'react-native';
import PropTypes from 'prop-types';

const INITIAL_ANIMATION_DURATION = 250;

export class KeyboardState extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    layout: PropTypes.shape({
      height: PropTypes.number.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    const {
      layout: { height },
    } = props;

    this.state = {
      contentHeight: height,
      keyboardAnimationDuration: INITIAL_ANIMATION_DURATION,
      keyboardHeight: 0,
      keyboardVisible: false,
      keyboardWillHide: false,
      keyboardWillShow: false,
    };
  }

  componentWillMount() {
    if (Platform.OS === 'ios') {
      this.keyboardSubscriptions = [
        Keyboard.addListener('keyboardWillShow', this.keyboardWillShow),
        Keyboard.addListener('keyboardDidShow', this.keyboardDidShow),
        Keyboard.addListener('keyboardWillHide', this.keyboardWillHide),
        Keyboard.addListener('keyboardDidHide', this.keyboardDidHide),
      ];
    } else {
      this.keyboardSubscriptions = [
        Keyboard.addListener('keyboardDidShow', this.keyboardDidShow),
        Keyboard.addListener('keyboardDidHide', this.keyboardDidHide),
      ];
    }
  }

  componentWillUnmount() {
    this.keyboardSubscriptions.forEach(subscription => subscription.remove());
  }

  keyboardWillShow = (event) => {
    this.setState({ keyboardWillShow: true });
    this.measure(event);
  };

  keyboardDidShow = (event) => {
    this.setState({
      keyboardVisible: true,
      keyboardWillShow: false,
    });
    this.measure(event);
  };

  keyboardWillHide = (event) => {
    this.setState({ keyboardWillHide: true });
    this.measure(event);
  };

  keyboardDidHide = () => {
    this.setState({
      keyboardWillHide: false,
      keyboardVisible: false,
    });
  };

  measure = (event) => {
    const { layout } = this.props;

    const {
      endCoordinates: { height, screenY },
      duration = INITIAL_ANIMATION_DURATION,
    } = event;

    this.setState({
      contentHeight: screenY - layout.y,
      keyboardAnimationDuration: duration,
      keyboardHeight: height,
    });
  };

  render() {
    const { children, layout } = this.props;
    const {
      contentHeight,
      keyboardAnimationDuration,
      keyboardHeight,
      keyboardVisible,
      keyboardWillHide,
      keyboardWillShow,
    } = this.state;

    return children({
      containerHeight: layout.height,
      contentHeight,
      keyboardAnimationDuration,
      keyboardHeight,
      keyboardVisible,
      keyboardWillHide,
      keyboardWillShow,
    });
  }
}

import { LayoutAnimation, Platform } from 'react-native';

export const layoutAnimations = {
  default: {
    duration: 750,
    type: LayoutAnimation.Types.easeIn,
    property: LayoutAnimation.Properties.scaleXY,
  },
};

export function startLayoutAnimation(config, onConfigured = () => {}) {
  const { duration, type, property } = config;
  const animation = LayoutAnimation.create(duration, type, property);

  const promise = new Promise((resolve) => {
    // Workaround for missing LayoutAnimation callback support on Android
    if (Platform.OS === 'android') {
      LayoutAnimation.configureNext(animation);
      setTimeout(resolve, duration);
    } else {
      LayoutAnimation.configureNext(animation, resolve);
    }
  });

  onConfigured();

  return promise;
}

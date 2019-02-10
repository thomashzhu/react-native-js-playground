import { StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { HomeScreen } from '../screens/HomeScreen';
import { FeedScreen } from '../screens/FeedScreen';

export const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Feed: {
      screen: FeedScreen,
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#FFF',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      headerTintColor: '#F00',
    },
  },
);

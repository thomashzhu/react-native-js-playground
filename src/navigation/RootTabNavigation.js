import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

import { HomeStack } from './HomeStack';
import { ProfileScreen } from '../screens/ProfileScreen';

/* eslint-disable react/prop-types */
const getTabBarIcon = icon => ({ tintColor }) => (
  <FontAwesome name={icon} size={24} style={{ color: tintColor }} />
);
/* eslint-enable react/prop-types */

export const RootTabNavigation = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: getTabBarIcon('home'),
        tabBarLabel: 'Home',
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: getTabBarIcon('user'),
        tabBarLabel: 'Profile',
      },
    },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: '#F00',
      inactiveTintColor: '#CCC',
      showIcon: true,
      showLabel: true,
      style: {
        backgroundColor: '#FFF',
      },
      indicatorStyle: null,
    },
  },
);

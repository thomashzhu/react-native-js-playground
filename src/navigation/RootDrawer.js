import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

/* prettier-ignore */
/* eslint-disable react/prop-types */
const getDrawerItemIcon = icon => (
  ({ tintColor }) => (
    <FontAwesome
      name={icon}
      size={24}
      style={{ color: tintColor }}
    />
  )
);
/* eslint-enable react/prop-types */

export const RootDrawer = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        drawerIcon: getDrawerItemIcon('home'),
        drawerLabel: 'Home',
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        drawerIcon: getDrawerItemIcon('user'),
        drawerLabel: 'Profile',
      },
    },
  },
  {
    initialRouteName: 'Home',
  }
);

import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Sale from './pages/Sale';
import NewSale from './pages/Sale/New';

import Delivery from './pages/Delivery';
import Expense from './pages/Expense';
import Statistic from './pages/Statistic';

const SaleStack = createStackNavigator({
  Sale: Sale,
  NewSale: NewSale,
});

const Routes = createAppContainer(
  createBottomTabNavigator(
    {
      Sale: SaleStack,
      Delivery,
      Expense,
      Statistic,
    },
    {
      defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused}) => {
          const {routeName} = navigation.state;
          let iconName;
          if (routeName === 'Sale') {
            iconName = 'local-offer';
          } else if (routeName === 'Delivery') {
            iconName = 'motorcycle';
          } else if (routeName === 'Expense') {
            iconName = 'attach-money';
          } else if (routeName === 'Statistic') {
            iconName = 'equalizer';
          }

          return (
            <Icon name={iconName} size={20} color="rgba(255, 255, 255, 0.6)" />
          );
        },
      }),
      resetOnBlur: true,
      tabBarOptions: {
        keyboardHidesTabBar: true,
        activeTintColor: '#FFF',
        inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        style: {
          backgroundColor: '#7159c1',
          height: 55,
          paddingBottom: 5,
        },
      },
    },
  ),
);

export default Routes;

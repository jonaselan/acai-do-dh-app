import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Sale from './pages/Sale';
import NewSale from './pages/Sale/New';
import ShowSale from './pages/Sale/Show';
import EditSale from './pages/Sale/Edit';

import Expense from './pages/Expense';
import NewExpense from './pages/Expense/New';
import ShowExpense from './pages/Expense/Show';
import EditExpense from './pages/Expense/Edit';

import Deliveryman from './pages/Deliveryman';
import NewDeliveryman from './pages/Deliveryman/New';
import EditDeliveryman from './pages/Deliveryman/Edit';
import ShowDeliveryman from './pages/Deliveryman/Show';

import Statistic from './pages/Statistic';

const Routes = createAppContainer(
  createBottomTabNavigator(
    {
      Sale: {
        screen: createStackNavigator(
          {
            Sale,
            NewSale,
            ShowSale,
            EditSale,
          },
          {
            navigationOptions: {
              tabBarLabel: 'Vendas',
            },
          },
        ),
      },
      Expense: {
        screen: createStackNavigator(
          {
            Expense,
            NewExpense,
            ShowExpense,
            EditExpense,
          },
          {
            navigationOptions: {
              tabBarLabel: 'Despesas',
            },
          },
        ),
      },
      Deliveryman: {
        screen: createStackNavigator(
          {
            Deliveryman,
            NewDeliveryman,
            EditDeliveryman,
            ShowDeliveryman,
          },
          {
            navigationOptions: {
              tabBarLabel: 'Entregadores',
            },
          },
        ),
      },
      Statistic: {
        screen: createStackNavigator(
          {
            Statistic,
          },
          {
            navigationOptions: {
              tabBarLabel: 'Estatisticas',
            },
          },
        ),
      },
    },
    {
      defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused}) => {
          const {routeName} = navigation.state;
          let iconName;
          if (routeName === 'Sale') {
            iconName = 'local-offer';
          } else if (routeName === 'Deliveryman') {
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

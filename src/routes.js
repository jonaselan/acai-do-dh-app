import {createAppContainer} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Main from './pages/Main';
import User from './pages/User';

const Routes = createAppContainer(
  createBottomTabNavigator(
    {
      Main,
      User,
    },
    {
      headerLayoutPresent: 'center',
      defaultBackTitleVisible: false,
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTintColor: '#FFF',
      },
    },
  ),
);

export default Routes;

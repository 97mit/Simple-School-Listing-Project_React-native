/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {Platform} from 'react-native';
import SplashScreen from '@Screens/splash';
import LoginScreen from '@Screens/auth/login';
import SignupScreen from '@Screens/auth/signup';
import UserProfile from '@Screens/profile/user';
import ChildProfile from '@Screens/profile/child';
import CompleteProfile from '@Screens/profile/user/complete';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import List from '@Screens/list';
import {Icon} from 'native-base';
import Details from '@Screens/details';

const AppNavigation = createStackNavigator(
  {
    // ChildProfile: {
    //   screen: ChildProfile,
    // },
    CompleteProfile: {
      screen: CompleteProfile,
    },
    UserProfile: {
      screen: UserProfile,
    },
  },
  {
    initialRouteName: 'CompleteProfile',
    headerMode: 'none',
    headerForceInset: {top: 'never', bottom: 'never'},
  },
  // {
  //   defaultNavigationOptions: ({navigation}) => {
  //     return {
  //       // headerTitle:navigation.state.params===undefined?navigation.state.routeName:navigation.state.params.name,
  //       // headerTitle: 'Value Buy',
  //       gestureDirection: 'default',
  //       gesturesEnabled: true,
  //       // headerMode: 'none',
  //       // unmountInactiveRoutes: true,
  //       headerStyle: {
  //         backgroundColor: '#fff',
  //       },
  //       // headerTintColor: '#000',
  //       // // headerTitleStyle: {
  //       // //   fontWeight: 'bold',
  //       // //   fontSize: 17,
  //       // //   color: 'black',
  //       // // },
  //     };
  //   },
  // },
);

const listStack = createStackNavigator(
  {
    List: {
      screen: List,
    },
    Details: {
      screen: Details,
    },
  },
  {
    initialRouteName: 'List',
    headerMode: 'none',
    headerForceInset: {top: 'never', bottom: 'never'},
  },
);

const MainPage = createBottomTabNavigator(
  {
    Profile: {
      screen: AppNavigation,
      navigationOptions: {
        // tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => <Icon name="ios-person" size={20} />,
      },
    },
    ChildProfile: {
      screen: ChildProfile,
      navigationOptions: {
        // tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => <Icon name="ios-people" size={20} />,
      },
    },
    List: {
      screen: listStack,
      navigationOptions: {
        // tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-notifications" size={20} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: '#e23737',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: 'white',
      },
    },
  },
);

AppNavigation.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({tintColor}) => (
    <Icon
      name="ios-person"
      style={{color: '#e23737'}}
      size={Platform.OS === 'ios' ? 28 : 20}
    />
  ),
};

// ChildProfile.navigationOptions = {
//   tabBarLabel: 'Profile',
//   tabBarIcon: ({tintColor}) => (
//     <Icon
//       name="ios-disc"
//       style={{color: '#e23737'}}
//       size={Platform.OS === 'ios' ? 28 : 20}
//     />
//   ),
// };

const Navigation = createSwitchNavigator({
  Splash: {
    screen: SplashScreen,
  },
  Auth: {
    screen: LoginScreen,
  },
  Signup: {
    screen: SignupScreen,
  },
  Main: {
    screen: MainPage,
  },
});

export default createAppContainer(Navigation);

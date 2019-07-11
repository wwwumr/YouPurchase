import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import Login from './components/Login';
import NavigatorBar from './components/NavigatorBar';
import Goodslist from './components/Goodslist';
const AppNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions:{
      header:null
    }
  },
  MainPage: {
    screen: NavigatorBar,
    navigationOptions:{
      header:null
    }
  }
}, {
    initialRouteName: 'MainPage',
});
const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
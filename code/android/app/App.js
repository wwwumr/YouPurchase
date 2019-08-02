import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import Login from './components/Login';
import NavigatorBar from './components/NavigatorBar';
import Goodslist from './components/Goodslist';
import GoodsDetail from './components/GoodsDetail';
import  OrderDetail from './components/OrderDetail';
import Registry from './components/Registry';
import  BaiduMapDemo  from './components/test/Test2'
import AddAddress from './components/AddAddress';
import AddAddressTable from './components/AddAddressTable';
import AddAddressTable2 from './components/AddAddressTable2';
import OrderOk from './components/OrderOk';
import OrderOk2 from './components/OrderOk2';
import StoreGradeShow from './components/StoreGradeShow';
const AppNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions:{
      header:null
    }
  },
  MainPage: {
    screen: NavigatorBar,//
    navigationOptions:{
      header:null
    }
  },
  Goodslist:{
    screen: Goodslist,
    navigationOptions:{
      header:null
    }
  },OrderDetail:{
    screen: OrderDetail,
    navigationOptions:{
      header:null
    }
  },
  Registry:{
    screen: Registry,
    navigationOptions:{
      header:null
    }
  },
  OrderOk:{
    screen: OrderOk,
    navigationOptions:{
      header:null
    }
  },
  OrderOk2:{
    screen: OrderOk2,
    navigationOptions:{
      header:null
    }
  },
  Map:{
    screen: BaiduMapDemo,
    navigationOptions:{
      header:null
    }
  },
  AddAddressTable:{
    screen: AddAddressTable,
    navigationOptions:{
      header:null
    }
  },
  AddAddressTable2:{
    screen: AddAddressTable2,
    navigationOptions:{
      header:null
    }
  },
  AddAddress:{
    screen: AddAddress,
    navigationOptions:{
      header:null
    }
  },
  StoreGradeShow:{
    screen: StoreGradeShow,
    navigationOptions:{
      header:null
    }
  },
  GoodsDetail:{
    screen: GoodsDetail,
    navigationOptions:{
      header:null
    }
  }
}, {
    initialRouteName: 'Login',
});
const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
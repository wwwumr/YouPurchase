import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import Login from './components/Login';
import NavigatorBar from './components/NavigatorBar';
import Goodslist from './components/Goodslist';
import GoodsDetail from './components/GoodsDetail';
import PersonPage from './components/PersonPage';
import Cart from './components/ShopCart';
import  OrderDetail from './components/OrderDetail';
import ShopCart1  from './components/ShopCart1';
import Orderlist from './components/Orderlist';
import OrderItem from './components/OrderItem';
import Registry from './components/Registry';
import Hello from './components/Test';
import LeftSideMenu from './components/test/Test';
import SqliteTest from './components/SqliteTest';
import  BaiduMapDemo  from './components/test/Test2'
import ItemMenu from './components/Menu';
import ShopItem from './components/ShopItem';
import AddAddress from './components/AddAddress';
import AddAddressTable from './components/AddAddressTable';
import AddAddressTable2 from './components/AddAddressTable2';
import OrderOk from './components/OrderOk';
import OrderOk2 from './components/OrderOk2';
import OrderOk3 from './components/OrderOk3';
import StoreGradeShow from './components/StoreGradeShow';
import PushMessage from './components/PushMessage';
import HomePage from './components/HomPage';
import EditPage from './components/EditPage';
import EditPassword from './components/EditPassword';
import EditPhone from './components/EditPhone';
import FindPassword from './components/FindPassword';
import SelectAddress from './components/SelectAddress';
import PossibleAddress from './components/PossibleAddress';
import RecGoodsDetail from './components/RecGoodsDetail';
const AppNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions:{
      header:null
    }
  },
  HomePage: {
    screen: HomePage,
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
  OrderOk3:{
    screen: OrderOk3,
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
  SelectAddress:{
    screen: SelectAddress,
    navigationOptions:{
      header:null
    }
  },
  PossibleAddress:{
    screen: PossibleAddress,
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
  EditPage:{
    screen: EditPage,
    navigationOptions:{
      header:null
    }
  },
  EditPassword:{
    screen: EditPassword,
    navigationOptions:{
      header:null
    }
  },
  EditPhone:{
    screen: EditPhone,
    navigationOptions:{
      header:null
    }
  },
  FindPassword:{
    screen: FindPassword,
    navigationOptions:{
      header:null
    }
  },
  RecGoodsDetail:{
    screen: RecGoodsDetail,
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
    initialRouteName: 'HomePage',
});
const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
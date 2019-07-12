import React, {Component} from 'react';
import {StyleSheet, View,Text,Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator'
import  Shoplist from './Shoplist';
import Goodlist  from './Goodslist';
import PersonPage from './PersonPage';
import Orderlist from './Orderlist'
import Cart from'./ShopCart';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
export default class NavigatorBar extends Component {
  /*初始化state*/
  constructor(props){
      super(props);
      this.state={
        selectedTab:'shouye',
      }
  }
    /**
     * 公共组件方法
     * @param selectedTab 选中的tab
     * @param title
     * @param icon
     * @param selectedIcon
     * @param imageStyle  选中时渲染图标的颜色
     * @param mark  角标
     * @param viewContent  页面内容
     * @returns {*}
     */
  tabNavigatorItems(selectedTab,title,icon,selectedIcon,imageStyle,mark,component){
      return (
        
          <TabNavigator.Item
              selected={this.state.selectedTab === selectedTab }
              title={title}
              renderIcon={()=> <Image style={styles.myImage} source={icon}/> }
              renderSelectedIcon={()=> <Image style={[styles.myImage,{tintColor:imageStyle}]} source={selectedIcon}/> }
              badgeText={mark}
              onPress={()=> this.setState({selectedTab:selectedTab}) }>
                {component}
          </TabNavigator.Item>
      )
  }
 
  render() {
    var id =  this.props.navigation.state.params.userId;
    console.log(id);
    return (
      <View style={styles.container}>
         <TabNavigator>
            {this.tabNavigatorItems('shouye',"首页",require('../images/shouye.jpg'),require("../images/shouye1.jpg"),'#ffe09a',"",<Shoplist navigation={this.props.navigation}/>)}
            {this.tabNavigatorItems('cart',"购物车",require('../images/cart1.jpg'),require("../images/cart.jpg"),'#65bb74',"",<Cart/>)}
            {this.tabNavigatorItems('dingdan',"订单",require('../images/dingdan.jpg'),require("../images/dingdan1.jpg"),'#6ebef3',"",<Orderlist userId={id}/>)}
            {this.tabNavigatorItems('user',"我的",require('../images/user.jpg'),require("../images/yonghu.jpg"),'#622193',"",<PersonPage userId={id}/>)}
         </TabNavigator>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    myImage:{
        width:22,
        height:22,
    }
});
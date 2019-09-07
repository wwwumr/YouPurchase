import React from 'react';
 
import { View, Text,DeviceEventEmitter } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements'; 
export default class Menu1 extends React.PureComponent {
  _menu = null;
 
  setMenuRef = ref => {
    this._menu = ref;
  };
  /**
   * @description 点击全部函数
   */
  hideMenu = () => {
    this._menu.hide();
    DeviceEventEmitter.emit('orderstatus');
  };
  /**
   * @description 点击代付款函数
   */
  hideMenu1 = () => {
    this._menu.hide();
    DeviceEventEmitter.emit('orderstatus1');
  };
  /**
   * @description 点击待发货函数
   */
  hideMenu2 = () => {
    this._menu.hide();
    DeviceEventEmitter.emit('orderstatus2');
  };
  /**
   * @description 点击配送中函数
   */
  hideMenu3 = () => {
    this._menu.hide();
    DeviceEventEmitter.emit('orderstatus3');
  };
  /**
   * @description 点击订单已送达函数
   */
  hideMenu4 = () => {
    this._menu.hide();
    DeviceEventEmitter.emit('orderstatus4');
  };
  showMenu = () => {
    this._menu.show();
  };
 
  render() {
    return (
        <Menu
          ref={this.setMenuRef}
          button={<View style={{marginTop:4}}>
      <TouchableOpacity onPress={this.showMenu}>
        <Text>类型</Text>
      </TouchableOpacity>
    </View>}
        >
          <MenuItem onPress={this.hideMenu}>全部</MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.hideMenu1}>待付款</MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.hideMenu2}>待发货</MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.hideMenu3}>配送中</MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.hideMenu4}>订单已送达</MenuItem>
          <MenuDivider />
        </Menu>
    );
  }
}
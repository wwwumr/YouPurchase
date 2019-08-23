import React from 'react';
 
import { View, Text,DeviceEventEmitter } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import {Icon} from 'react-native-elements'; 
export default class Menu1 extends React.PureComponent {
  _menu = null;
 
  setMenuRef = ref => {
    this._menu = ref;
  };
  hideMenu = () => {
    this._menu.hide();
    DeviceEventEmitter.emit('orderstatus');
  };
  hideMenu1 = () => {
    this._menu.hide();
    DeviceEventEmitter.emit('orderstatus1');
  };
  hideMenu2 = () => {
    this._menu.hide();
    DeviceEventEmitter.emit('orderstatus2');
  };
  hideMenu3 = () => {
    this._menu.hide();
    DeviceEventEmitter.emit('orderstatus3');
  };
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
          button={<Icon name='menu' color='#fff' onPress={this.showMenu}/>}
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
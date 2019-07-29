import React from 'react';
 
import { View, Text,DeviceEventEmitter } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import {Icon} from 'react-native-elements'; 
export default class ItemMenu extends React.PureComponent {
  _menu = null;
 
  setMenuRef = ref => {
    this._menu = ref;
  };
 
  hideMenu1 = () => {
    this._menu.hide();
    DeviceEventEmitter.emit('change1');
  };
  hideMenu2 = () => {
    this._menu.hide();
    DeviceEventEmitter.emit('change2');
  };
  hideMenu3 = () => {
    this._menu.hide();
    DeviceEventEmitter.emit('change3');
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
          <MenuItem onPress={this.hideMenu1}>距离优先</MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.hideMenu2}>销量优先</MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.hideMenu3}>评分优先</MenuItem>
          <MenuDivider />
        </Menu>
    );
  }
}
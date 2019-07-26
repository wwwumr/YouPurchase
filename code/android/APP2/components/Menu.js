import React from 'react';
 
import { View, Text } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import {Icon} from 'react-native-elements'; 
export default class ItemMenu extends React.PureComponent {
  _menu = null;
 
  setMenuRef = ref => {
    this._menu = ref;
  };
 
  hideMenu = () => {
    this._menu.hide();
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
          <MenuItem onPress={this.hideMenu}>距离优先</MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.hideMenu}>销量优先</MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.hideMenu}>评分优先</MenuItem>
          <MenuDivider />
        </Menu>
    );
  }
}
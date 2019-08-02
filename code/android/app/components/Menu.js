import React from 'react';
 
import { View, Text,DeviceEventEmitter } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import {Icon} from 'react-native-elements'; 
export default class ItemMenu extends React.PureComponent {
  _menu = null;
  /*********************************** 
    ****          时间处理函数     ****
    ************************************/

    /**
     * @description 线束菜单
     */
  setMenuRef = ref => {
    this._menu = ref;
  };
  /*********************************** 
    ****          事件处理函数    ****
    ************************************/

    /**
     * @description 触发change1信号的监听
     */
  hideMenu1 = () => {
    this._menu.hide();
    DeviceEventEmitter.emit('change1');
  };
  /*********************************** 
    ****          事件处理函数    ****
    ************************************/

    /**
     * @description 触发change2信号的监听
     */
  hideMenu2 = () => {
    this._menu.hide();
    DeviceEventEmitter.emit('change2');
  };
  /*********************************** 
    ****          事件处理函数    ****
    ************************************/

    /**
     * @description 触发change2信号的监听
     */
  hideMenu3 = () => {
    this._menu.hide();
    DeviceEventEmitter.emit('change3');
  };
  /*********************************** 
    ****          事件处理函数    ****
    ************************************/

    /**
     * @description 显示菜单
     */
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
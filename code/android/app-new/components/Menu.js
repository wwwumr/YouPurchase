import React from 'react';
 
import { View, Text,DeviceEventEmitter } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import {Icon} from 'react-native-elements'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
/**
 * @constructor 商店列表排序组件
 * @description
 */
export default class ItemMenu extends React.PureComponent {
  _menu = null;
 
  setMenuRef = ref => {
    this._menu = ref;
  };
  /**
   * @description 点击获取默认的列表
   */
  hideMenu = () => {
    this._menu.hide();
    DeviceEventEmitter.emit('change');
  };
  /**
   * @description 点击距离优先函数
   */
  hideMenu1 = () => {
    this._menu.hide();
    DeviceEventEmitter.emit('change1');
  };
  /**
   * @description 点击销量优先函数
   */
  hideMenu2 = () => {
    this._menu.hide();
    DeviceEventEmitter.emit('change2');
  };
  /**
   * @description 点击评分优先函数
   */
  hideMenu3 = () => {
    this._menu.hide();
    DeviceEventEmitter.emit('change3');
  };
  /**
   * 展示出menu
   */
  showMenu = () => {
    this._menu.show();
  };
 
  render() {
    return (
        <Menu
          ref={this.setMenuRef}
          button={<View style={{marginTop:4}}>
          <TouchableOpacity onPress={this.showMenu}>
            <Text style={{fontSize:16}}>排序</Text>
          </TouchableOpacity>
        </View>}
        >
          <MenuItem onPress={this.hideMenu}>全部</MenuItem>
          <MenuDivider />
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
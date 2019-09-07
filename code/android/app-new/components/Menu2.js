import React from 'react';
 
import { View, Text,DeviceEventEmitter } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import {Icon} from 'react-native-elements'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
/**
 * @description 商品类别menu
 * @constructor
 */
export default class ClassMenu extends React.PureComponent {
  _menu = null;
 
  setMenuRef = ref => {
    this._menu = ref;
  };
  /**
   * @description 点击其中一种类别之后的响应函数
   */
  selected = () => {
    this._menu.hide();
    DeviceEventEmitter.emit('getClass');
  };
  /**
   * @description 展示出Menu
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
            <Text style={{fontSize:16}}>类型</Text>
          </TouchableOpacity>
        </View>}
        >
            <MenuItem onPress={()=>{
                        this._menu.hide();
                        DeviceEventEmitter.emit('getClass',-1,'全部');
                    }}>全部</MenuItem>
                    <MenuDivider />
            <View>{
            this.props.classlist.map((item,i)=>{
                return(
                    <View><MenuItem onPress={()=>{
                        this._menu.hide();
                        DeviceEventEmitter.emit('getClass',item.commodityClassId,item.classInfo);
                    }}>{item.classInfo}</MenuItem>
                    <MenuDivider /></View>
                )
            })
          
         }
          </View>
        </Menu>
    );
  }
}